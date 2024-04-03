library(dplyr)
library(pwr)
library(ggplot2)
library(forcats)


#Imports
data <- read.csv("Modified/filtered_quantitative.csv")
nrow(data)

##############################
# ======= PLOT: Attitude Changes =========
##############################


daten_new <- data %>%
  mutate(
    topic_attitude = case_when(
      trimws(topic) == "Should students wear school uniform?" ~ as.character(firstTopic),
      trimws(topic) == "Should intellectual property rights exist?" ~ as.character(secondTopic),
      trimws(topic) == "Is Obesity a Disease?" ~ as.character(thirdTopic),
      TRUE ~ topic 
    )
  )

daten_new <- daten_new %>%
  mutate(attitude_change = evalGrade - as.integer(topic_attitude))

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

data_new$topic <- factor(data_new$topic, levels = c("Should students wear school uniform?",
                                                    "Should intellectual property rights exist?",
                                                    "Is Obesity a Disease?"))

data_new$condition <- factor(data_new$condition, levels = c("con", "neutral", "pro"))

general_means <- data_new %>%
  group_by(condition) %>%
  summarise(general_mean = median(attitude_change, na.rm = TRUE))


ggplot(data_new, aes(x = condition, y = attitude_change)) + 
  geom_hline(data = general_means, aes(yintercept = general_mean, color = condition), 
             linetype = "dashed", size = 1, inherit.aes = FALSE) +
  geom_boxplot(aes(fill = condition)) + 
  facet_wrap(~ topic, scales = "free_x", ncol = 1) + 
  scale_fill_manual(values = c("con" = "blue", "neutral" = "grey", "pro" = "red")) + 
  scale_color_manual(values = c("con" = "blue", "neutral" = "grey", "pro" = "red")) + 
  theme_minimal(base_size = 14) + 
  theme(legend.position = "bottom") + 
  labs(x = "Condition", y = "Attitude Change",
       title = "Change of opinion according to topic and condition",
       fill = "Condition",
       color = "General Median per Condition:") +
  theme(legend.title.align = 0.5) 



