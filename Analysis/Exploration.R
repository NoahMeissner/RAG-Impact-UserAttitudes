library(ggpattern)
library(dplyr)
library(ggplot2)
library(tidyr)


# Imports
data <- read.csv("Modified/filtered_quantitative.csv")
opinion <- read.csv("Modified/filtered_quantitative_opinion.csv")
messages <- read.csv("Data/messages.csv")
raw <- read.csv("Data/participant_raw.csv")
topic_grade <- read.csv("Data/topic_grade.csv")
people_qualitative <- read.csv("Modified/Delete_People.csv")


##########################
# === Descriptive Statistics and Initial Exploration ===
##########################

##########################
# Group distribution

#Manually kicked out
qualitative_excluded <-26
# Distribution without opinion Opinion
opinion_number <- nrow(opinion)
no_opinion_col <- nrow(data)
print(opinion_number/(opinion_number+no_opinion_col)) # 0.25
print(no_opinion_col/(opinion_number+no_opinion_col+qualitative_excluded)) # 0.5660377


# Distribution of topics
topic_grouped <- data %>%
  group_by(topic) %>%
  summarise(Anzahl = n())

print(topic_grouped)

# Distribution of the categories
condition_group <- data %>%
  group_by(condition) %>%
  summarise(Anzahl = n())

print(condition_group)


# Distribution of the categories grouped by topics
combined_group <- data %>%
  group_by(topic, condition) %>%
  summarise(Anzahl = n(), .groups = 'drop') 

print(combined_group)

##########################

# === Task Time ===

# time based on topic
data %>% 
  group_by(topic) %>% 
  summarise(
    median_time_rounded = round(median(task_time / 60, na.rm = TRUE), 2),
    sd_time_rounded = round(sd(task_time / 60, na.rm = TRUE), 2),
    iqr_time_rounded = round(IQR(task_time / 60, na.rm = TRUE), 2)
  )
# time based on condition
data %>% 
  group_by(condition) %>% 
  summarise(
    median_time_rounded = round(median(task_time / 60, na.rm = TRUE), 2),
    sd_time_rounded = round(sd(task_time / 60, na.rm = TRUE), 2),
    iqr_time_rounded = round(IQR(task_time / 60, na.rm = TRUE), 2)
  )
##########################

# === Length Chats ===


# Length of the chats 
messages_filtered <- messages %>% filter(username == "User")
count_table <- messages_filtered %>%
  group_by(participant_id) %>%
  summarise(number_of_questions = n())

count_table <- count_table  %>% rename(id = participant_id)
merged_data <- inner_join(data, count_table, by = "id")

# Length of chats based on the condition
merged_data %>% 
  group_by(condition) %>% 
  summarise(
    median_time_rounded = round(median(number_of_questions, na.rm = TRUE), 2),
    sd_time_rounded = round(sd(number_of_questions , na.rm = TRUE), 2),
    iqr_time_rounded = round(IQR(number_of_questions, na.rm = TRUE), 2)
  )

# Length of chats based on the topic
merged_data %>% 
  group_by(topic) %>% 
  summarise(
    median_time_rounded = round(median(number_of_questions, na.rm = TRUE), 2),
    sd_time_rounded = round(sd(number_of_questions , na.rm = TRUE), 2),
    iqr_time_rounded = round(IQR(number_of_questions, na.rm = TRUE), 2)
  )

##########################

# === Demographics Distribution ===

#Which languages they used
relative_distribution_language <- prop.table(table(people_qualitative$Language))
print(relative_distribution_language)


# Distribution gender 
relative_distribution_gender <- prop.table(table(raw$gender))
print(relative_distribution_gender)

# Distribution occupation 
relative_distribution_occupation <- prop.table(table(raw$occupation))
print(relative_distribution_occupation)

# Distribution of educational level 
relative_distribution_level <- prop.table(table(raw$level))
print(relative_distribution_level)

# Distribution of age 
relative_distribution_age <- prop.table(table(raw$age))
print(relative_distribution_age)

raw %>% 
  summarise(
    median_time_rounded = round(median(age, na.rm = TRUE), 2),
    sd_time_rounded = round(sd(age , na.rm = TRUE), 2),
    iqr_time_rounded = round(IQR(age, na.rm = TRUE), 2)
  )

#Range Age
print(range(raw$age))

##########################

# === General opinion on the topics ===

print("Summary for Should Students wear Uniforms")
data %>%
  summarise(
    median_topic1 = median(firstTopic, na.rm = TRUE),
    sd_topic1 = sd(firstTopic, na.rm = TRUE),
    iqr_topic1 = IQR(firstTopic, na.rm = TRUE)
  )

print("Summary for Intellectual Property Rights")
data %>%
  summarise(
    median_topic2 = median(secondTopic, na.rm = TRUE),
    sd_topic2 = sd(secondTopic, na.rm = TRUE),
    iqr_topic2 = IQR(secondTopic, na.rm = TRUE)
  )

print("Summary for Obesity")
topic_grade %>%
  summarise(
    median_topic3 = median(thirdTopic, na.rm = TRUE),
    sd_topic3 = sd(thirdTopic, na.rm = TRUE),
    iqr_topic3 = IQR(thirdTopic, na.rm = TRUE)
  )







