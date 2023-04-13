# Author: Austin Stephen
# Date: 4/09/23
# Purpose:Analyse the results of HPO.

library(tidyverse)

results <- read.csv("./Documents/Senior_Design/classificationModel/HPO.csv")

summary(results)
best <- results %>% filter(meanAcc > .83)
worst <- results %>% filter(MeanAcc < 0.45)
longest <- results %>% filter(time > 100)

results %>% ggplot(aes(x= as.factor(randomRot), y=meanAcc)) +
  geom_point()
