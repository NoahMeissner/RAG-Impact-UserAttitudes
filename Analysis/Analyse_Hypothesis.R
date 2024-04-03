#install.packages("pwr")
library(car)
library(dplyr)
library(pwr)

#Imports
data <- read.csv("Modified/filtered_quantitative.csv")
nrow(data)

##############################
# ======= Hypothesis 1: Attitude Change due to Stances =========
##############################

daten_new <- data %>%
  mutate(
    topic = case_when(
      trimws(topic) == "Should students wear school uniform?" ~ as.character(firstTopic),
      trimws(topic) == "Should intellectual property rights exist?" ~ as.character(secondTopic),
      trimws(topic) == "Is Obesity a Disease?" ~ as.character(thirdTopic),
      TRUE ~ topic 
    )
  )

daten_new <- daten_new %>%
  mutate(attitude_change = evalGrade - as.integer(topic))

daten_new %>% 
  group_by(condition) %>% 
  summarise(
    mean_attitude_change_rounded = round(mean(attitude_change, na.rm = TRUE), 2),
    sd_attitude_change_rounded = round(sd(attitude_change, na.rm = TRUE), 2),
    iqr_attitude_change_rounded = round(IQR(attitude_change, na.rm = TRUE), 2)
  )


data_new <- daten_new %>%
  mutate(
    stance = case_when(
      trimws(condition) == "pro" ~ 1,
      trimws(condition) == "neutral" ~ 0,
      trimws(condition) == "con" ~ -1,
      TRUE ~ NA_integer_ 
    )
  )  

# Check whether the samples are normally distributed.
shapiro.test(data_new %>% filter(stance > 0) %>% pull(attitude_change))
# p_value 6.694e-05
shapiro.test(data_new %>% filter(stance < 0) %>% pull(attitude_change))
# p_value 0.5723
shapiro.test(data_new %>% filter(stance == 0) %>% pull(attitude_change))
# p_value 0.001484

# Check if the variances are evenly distributed.
leveneTest(data = data_new, attitude_change ~ as.factor(stance)) # 0.1205

boxplot(data_new$attitude_change ~ data_new$condition)

##############################
# Statistical Tests
##############################

# Kruskal-Wallis-Test to overestimate the significance of differences between groups.
kruskal_results <- kruskal.test(attitude_change ~ condition, data = data_new)

print(kruskal_results) # p_value 0.1967

# -> We have balanced groups, so we want to look at how 
# -> whether opinions in general do not change.

##############################
# Statistical Tests - Check if there is a general Attitude Change
##############################

attitudeBefore <- as.numeric(data_new$topic)  
attitudeAfter <- as.numeric(data_new$evalGrade) 

shapiro.test(attitudeBefore) # 2.195e-08
shapiro.test(attitudeAfter) #0.0001327
leveneTest(attitudeBefore ~ factor(attitudeAfter)) # 0.09501


test <- wilcox.test(attitudeAfter,attitudeBefore, paired = TRUE, exact = FALSE, alternative="greater")
print(test) # 0.0002938


set.seed(123) 
n <- length(attitudeBefore)
iter <- 1000 
alpha <- 0.05 
significantResult <- 0

for (i in 1:iter) {
  sim_attitudeBefore <- sample(attitudeBefore, n, replace = TRUE)
  sim_attitudeAfter <- sim_attitudeBefore + rnorm(n, mean = mean(attitudeAfter-attitudeBefore), sd = sd(attitudeAfter-attitudeBefore))
  
  test_result <- wilcox.test(sim_attitudeAfter, sim_attitudeBefore, paired = TRUE, exact = FALSE, alternative="greater")
  
  if (test_result$p.value < alpha) {
    significantResult <- significantResult + 1
  }
}

power_estimate <- significantResult / iter
print(paste("Estimated test strength:", power_estimate))
# Power -> 98.5%



# Create Boxplots
boxplot(attitudeBefore, attitudeAfter, names = c("Before", "After"), 
        main = "Comparison", 
        ylab = "Attitude",
        col = c("lightblue", "salmon"))

##############################
# Statistical Tests - Check if there is a Attitude Change in Group Pro
##############################

pro_change <- data_new %>% 
  filter(condition == "pro") %>% 
  select(topic, attitude_change) %>%
  na.omit()

print(length(pro_change$topic))

attitudeBefore <- as.numeric(pro_change$topic) 
attitudeAfter <- as.numeric(pro_change$attitude_change)  

shapiro.test(attitudeBefore) # 3.77e-05
shapiro.test(attitudeAfter) #6.694e-05
leveneTest(attitudeBefore ~ factor(attitudeAfter)) # 0.6673


test <- wilcox.test(attitudeAfter,attitudeBefore, paired = TRUE, exact = FALSE, alternative="greater")
print(test) # 0.001053


n <- length(attitudeBefore)
iter <- 1000 
alpha <- 0.05 
significantResult <- 0

for (i in 1:iter) {
  sim_attitudeBefore <- sample(attitudeBefore, n, replace = TRUE)
  sim_attitudeAfter <- sim_attitudeBefore + rnorm(n, mean = mean(attitudeAfter-attitudeBefore), sd = sd(attitudeAfter-attitudeBefore))
  
  test_result <- wilcox.test(sim_attitudeAfter, sim_attitudeBefore, paired = TRUE, exact = FALSE, alternative="greater")
  
  if (test_result$p.value < alpha) {
    significantResult <- significantResult + 1
  }
}

power_estimate <- significantResult / iter
print(paste("Estimated test strength:", power_estimate))
# Power -> 0.962%


# Create Boxplots
boxplot(attitudeBefore, attitudeAfter, names = c("Before", "After"), 
        main = "Comparison", 
        ylab = "Attitude",
        col = c("lightblue", "salmon"))


##############################
# Statistical Tests - Check if there is a Attitude Change in Group Balanced
##############################

# For the "neutral" condition
neutral_change <- data_new %>% 
  filter(condition == "neutral") %>% 
  select(topic, evalGrade) %>%
  na.omit()

print(length(neutral_change$topic))

attitudeBefore <- as.numeric(neutral_change$topic) 
attitudeAfter <- as.numeric(neutral_change$evalGrade)  

shapiro.test(attitudeBefore) # 0.0007642
shapiro.test(attitudeAfter) #0.0443
leveneTest(attitudeBefore ~ factor(attitudeAfter)) # 0.2458


test <- wilcox.test(attitudeAfter,attitudeBefore, paired = TRUE, exact = FALSE, alternative="greater")
print(test) # 0.1965

# Create Boxplots
boxplot(attitudeBefore, attitudeAfter, names = c("Before", "After"), 
        main = "Comparison", 
        ylab = "Attitude",
        col = c("lightblue", "salmon"))


##############################
# Statistical Tests - Check if there is a Attitude Change in Group Contra
##############################


# For the "con" condition
con_change <- data_new %>% 
  filter(condition == "con") %>% 
  select(topic, evalGrade) %>%
  na.omit()  
print(length(con_change$topic))


attitudeBefore <- as.numeric(con_change$topic) 
attitudeAfter <- as.numeric(con_change$evalGrade)  

shapiro.test(attitudeBefore) # 0.0007642
shapiro.test(attitudeAfter) #0.0206
leveneTest(attitudeBefore ~ factor(attitudeAfter)) # 0.8862


test <- wilcox.test(attitudeAfter,attitudeBefore, paired = TRUE, exact = FALSE, alternative="greater")
print(test) # 0.133

# Create Boxplots
boxplot(attitudeBefore, attitudeAfter, names = c("Before", "After"), 
        main = "Comparison", 
        ylab = "Attitude",
        col = c("lightblue", "salmon"))
