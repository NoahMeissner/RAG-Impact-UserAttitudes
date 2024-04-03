library(car)
library(dplyr)
library(tidyr) 
library(pwr)


#Imports
data <- read.csv("Modified/qualitative_prompts_finish.csv")
all_data <- read.csv("Modified/filtered_quantitative.csv")
count <- read.csv("Modified/count_prompts.csv")
arguments_after <- read.csv("Modified/arguments_after_qualitativ.csv")
prompts <- read.csv("Modified/qualitative_prompts_finish.csv")
filtered_opinion <- read.csv("Modified/filtered_quantitative_opinion.csv")
##############################
# Exploratory Analysis
##############################

##############################
# === Difference between the assigned conditions and the prompt stances ===
##############################

data_new <- data %>%
  mutate(
    condition = case_when(
      trimws(condition) == "pro" ~ 3,
      trimws(condition) == "neutral" ~ 0,
      trimws(condition) == "con" ~ -3,
      TRUE ~ NA_integer_ 
    )
)  

shapiro.test(data_new %>% pull(condition)) # 3.434e-09

leveneTest(data = data_new, Stance ~ as.factor(condition)) #0.4468


ergebnis <- wilcox.test(as.integer(data_new$condition), data_new$Stance, paired = TRUE)
print(ergebnis) # p_value 0.8677

##############################
# ===  Time Influence ===
##############################

# Does time have an influence on the change of opinion?
all_data <- all_data %>% 
  mutate(task_time_int = as.integer(task_time))

all_data <- all_data %>%
  mutate(
    stance = case_when(
      trimws(condition) == "pro" ~ 1,
      trimws(condition) == "neutral" ~ 0,
      trimws(condition) == "con" ~ -1,
      TRUE ~ NA_integer_ 
    )
  ) 

all_data <- all_data %>%
  mutate(attitude_change = evalGrade - stance)

all_data <- all_data %>%
  mutate(stance = if_else(
    (stance < 0 & attitude_change < 0) | 
      (stance > 0 & attitude_change > 0) | 
      (stance == 0 & attitude_change == 0), 
    1, 
    0
  ))



all_data <- all_data %>%
  mutate(quick_searcher = if_else(task_time_int < median(task_time_int, na.rm = TRUE), 1, 0))

tab_quick <- all_data %>%
  select(quick_searcher, stance) %>%
  table()

print(tab_quick)

chisq.test(tab_quick)

##############################
# === Arguments that have informed the user ===
##############################


filtered_Data <- all_data %>% 
  select(id, condition)
data <- inner_join(filtered_Data, arguments_after, by = "id")

prompt <- prompts %>% 
  select(Stance, id)


merged_data <- inner_join(data,prompt, by = "id")


data_A <- merged_data %>%
  filter(!is.na(ConArgument) | !is.na(ProArgument) | !is.na(Nothingchanged)) %>%
  mutate(
    ConArgument = replace_na(ConArgument, 0),
    ProArgument = replace_na(ProArgument, 0),
    Nothingchanged = replace_na(Nothingchanged, 0),
    ProStatement = replace_na(ProStatement,0),
    ConStatement = replace_na(ConStatement,0)
  )

print(length(merged_data$condition))

data_test <- merged_data %>%
  select(Stance, id,ConArgument,ProArgument,Nothingchanged, condition)


data_test <- data_test %>%
  mutate(change = ProArgument - ConArgument)

data_test <- data_test %>%
  select(Stance, condition)

print(data_test)



boxplot( data_test$Stance  ~ data_test$condition)
print(data_test$condition)

shapiro.test(data_test %>% filter(condition == 'pro') %>% pull(Stance))
# p_value 8.656e-07
shapiro.test(data_test %>% filter(condition == 'con') %>% pull(Stance))
# p_value 0.005995
shapiro.test(data_test %>% filter(condition == 'neutral') %>% pull(Stance))
# p_value 0.0005629

# Check if the variances are evenly distributed.
leveneTest(data = data_test, Stance ~ as.factor(condition)) #0.7267


# Kruskal-Wallis-Test to overestimate the significance of differences between groups.
kruskal_results <- kruskal.test(Stance ~ condition, data = data_test)

print(kruskal_results)
# Prompts received p_value 0.0003696


### -> It follows that they have worked and we can see if it has arrived

merged_data <- merged_data %>%
  filter(!is.na(ConArgument) | !is.na(ProArgument) | !is.na(Nothingchanged)) %>%
  mutate(
    ConArgument = replace_na(ConArgument, 0),
    ProArgument = replace_na(ProArgument, 0),
    Nothingchanged = replace_na(Nothingchanged, 0),
    ProStatement = replace_na(ProStatement,0),
    ConStatement = replace_na(ConStatement,0)
  )


print(length(merged_data$condition))

data_test <- merged_data %>%
  select(Stance, id,ConArgument,ProArgument,Nothingchanged, condition)


data_test <- data_test %>%
  mutate(change = ProArgument - ConArgument)

data_test <- data_test %>%
  select(change, condition)

print(data_test)

boxplot( data_test$change  ~ data_test$condition)


shapiro.test(data_test$change)
# p_value 0.2063

# Check if the variances are evenly distributed.
leveneTest(data = data_test, change ~ as.factor(condition)) # 0.1337


# Kruskal-Wallis-Test to overestimate the significance of differences between groups.
anova_results <- aov(change ~ condition, data = data_test)

summary(anova_results)

# -> no differences between groups p_value 0.771