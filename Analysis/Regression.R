library(ggpattern)
library(ggplot2)
library(car)
library(pwr)
library(lmtest)
library(dplyr)


data <- read.csv("Modified/filtered_quantitative.csv")

daten_new <- data %>%
  mutate(
    topic = case_when(
      trimws(topic) == "Should students wear school uniform?" ~ as.character(firstTopic),
      trimws(topic) == "Should intellectual property rights exist?" ~ as.character(secondTopic),
      trimws(topic) == "Is Obesity a Disease?" ~ as.character(thirdTopic),
      TRUE ~ topic 
    )
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

## PRO 

pro <- data_new %>% 
  filter(condition == "pro") %>% 
  select(topic, evalGrade) %>%
  na.omit()

nrow(pro)


model <- lm(evalGrade ~ topic, data = data_new)

print(summary(model))

bp_test_result <- bptest(model)

print(bp_test_result)

ggplot(data_new, aes(x = topic, y = evalGrade, fill = topic)) +
  geom_boxplot() +
  labs(title = "Boxplot von attitude_change nach topic",
       x = "stance before",
       y = "evalGrade") +
  theme_minimal() +
  scale_fill_manual(values = c("englisch_leicht" = "blue", "englisch_schwer" = "red"))

## CON

pro <- data_new %>% 
  filter(condition == "con") %>% 
  select(topic, evalGrade) %>%
  na.omit()

nrow(pro)


model <- lm(evalGrade ~ topic, data = data_new)

print(summary(model))

bp_test_result <- bptest(model)

print(bp_test_result)

ggplot(data_new, aes(x = topic, y = evalGrade, fill = topic)) +
  geom_boxplot() +
  labs(title = "Boxplot von attitude_change nach topic CON",
       x = "stance before",
       y = "evalGrade") +
  theme_minimal() +
  scale_fill_manual(values = c("englisch_leicht" = "blue", "englisch_schwer" = "red"))



