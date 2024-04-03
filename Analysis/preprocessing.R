library(tidyverse)
library(data.table)
library(dplyr)
library(stringr)
library(lubridate)
##############################
# ====  Read quantitative Data ====
##############################
personal <- read.csv("Data/personal_data.csv")
likertscale <- read.csv("Data/topic_grade.csv")
time_stamp <- read.csv("Data/topic_timestamps.csv")

# We check if the student has been misspelled or written with additional information.
personal <- personal %>%
  mutate(occupation = if_else(str_detect(occupation, regex("student", ignore_case = TRUE)), 
                              "Student", 
                              occupation))
personal <- personal %>%
  mutate(gender = if_else(str_detect(gender, regex("Männlich", ignore_case = TRUE)), 
                              "Male", 
                              gender))
personal <- personal %>%
  mutate(gender = if_else(str_detect(gender, regex("Weiblich", ignore_case = TRUE)), 
                          "Female", 
                          gender))

personal_filtered <- personal %>% filter(mildness == "True")

opinion_participants <- personal %>% filter(mildness == "False")

##############################
# ==== Calculate Time Durations ===
##############################
time_stamp$preStudy <- ymd_hms(time_stamp$preStudy)
time_stamp$preTask <- ymd_hms(time_stamp$preTask)
time_stamp$task <- ymd_hms(time_stamp$task)
time_stamp$postTask <- ymd_hms(time_stamp$postTask)
time_stamp$taskDescription <- ymd_hms(time_stamp$taskDescription)
time_stamp$informationConsent <- ymd_hms(time_stamp$informationConsent)

  
time_stamp$preStudy <- hour(time_stamp$preStudy) * 3600 + minute(time_stamp$preStudy) * 60 + second(time_stamp$preStudy)
time_stamp$preTask <- hour(time_stamp$preTask) * 3600 + minute(time_stamp$preTask) * 60 + second(time_stamp$preTask)
time_stamp$task <- hour(time_stamp$task) * 3600 + minute(time_stamp$task) * 60 + second(time_stamp$task)
time_stamp$postTask <- hour(time_stamp$postTask) * 3600 + minute(time_stamp$postTask) * 60 + second(time_stamp$postTask)
time_stamp$taskDescription <- hour(time_stamp$taskDescription) * 3600 + minute(time_stamp$taskDescription) * 60 + second(time_stamp$taskDescription)
time_stamp$informationConsent <- hour(time_stamp$informationConsent) * 3600 + minute(time_stamp$informationConsent) * 60 + second(time_stamp$informationConsent)

time_stamp$condition_time <- time_stamp$preStudy - time_stamp$informationConsent
time_stamp$before_time <-  time_stamp$preTask - time_stamp$preStudy
time_stamp$task_time <- time_stamp$task - time_stamp$taskDescription
time_stamp$after_time <- time_stamp$postTask - time_stamp$task

time_stamp <- select(time_stamp, -c(start,informationConsent,preStudy,preTask,taskDescription,task,postTask))

##############################
# ========== Rename Columns ===========================
##############################
demographics <- personal_filtered  %>% rename(id = participant_id)
demographics_opinion <- opinion_participants %>% rename(id = participant_id)
demographics <- demographics  %>% rename(level = levelofeducation)
demographics_opinion <- demographics_opinion %>% rename(level = levelofeducation)
likertscale <- likertscale %>% rename(id = participant_id)
time_stamp <- time_stamp  %>% rename(id = participant_id)

##############################
# ======== Merge Data Frames && Safe them ==========================
##############################
ids <- c('82650439-665d-4dce-bdc5-dc2ac91946fb','aaac90bf-0aba-4c34-abe5-0f5cb0eee723','dabae361-1f11-4384-a953-17504986e0ab','c5fba9c5-4927-4162-bb2b-227d5153d459','118ce8cf-7b59-4b98-9632-caf3d9634c05','8c58b848-6b10-4dd5-bdc7-5af82d2bcc87','7544ab85-ddb2-4ad3-b0ad-995b54f2ef29','31827870-dab8-4dcf-93e0-63ca6a8780c0','bc6b68c3-8258-4e8a-8359-a413084a1293','3bce2d61-9e28-4f84-b8c5-25785ba9a059','a9bf32d8-4b00-445c-afd6-fdfcd5ec59eb','1baf96b4-c0d0-4253-937f-99736509bf80','41927969-92d9-4b90-9253-1b335880ae77','b102a5f7-7182-4106-9552-84a5451d9431','bf4cd9d1-0460-498c-a099-2e89fcc91626','0b9b54f4-4571-42d2-8977-b180f50e2883','a5f2fe77-4f68-44e4-bd41-767fac4c136d','1f6f5800-a6f2-4f79-9dae-f89bc8d82688','b7e5e281-147a-4fdd-bcc6-43669c58ddd9','51b331bf-f4c9-4584-ad31-906add9b0454','a4700b4c-6c2b-409f-9a87-3587b5b5509e','8a7e40cc-6d83-4d78-ad6b-762bb8643cdc','76af0a0c-0684-406e-8445-a37ca339ace1','e7f45769-42c2-4ffb-891e-595b0edc9201','99f9d31d-0827-4d3e-b738-ef501c092746','d9227b0a-0ef2-4bae-a2b9-62a7ada7d0ba')
merged_data <- inner_join(demographics, likertscale, by = "id")
print(length(final_data))

final_data <- inner_join(merged_data, time_stamp, by = "id")
with_opinion <- final_data %>% filter(id %in% ids)
final_data <- final_data %>% filter(!(id %in% ids))
print(length(final_data))
write.csv(final_data, "Modified/filtered_quantitative.csv", row.names = FALSE)

merge_opinion <- inner_join(demographics_opinion, likertscale, by = "id")
merged_opinion <- inner_join(merged_data, time_stamp, by = "id")
merged_opinion <- inner_join(merged_data, time_stamp, by = "id")
opinion <- inner_join(merge_opinion, merged_opinion, by = "id")
opinion <- inner_join(with_opinion, opinion, by = "id")
write.csv(merge_opinion, "Modified/filtered_quantitative_opinion.csv", row.names = FALSE)


prompts <- read.csv2('Modified/test.csv')
print(prompts$id)
write.csv(prompts, "Modified/UserPrompts_finished.csv", row.names = FALSE)

