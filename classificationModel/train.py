# Author: Austin Stephen
# Date: 01/24/2023
# Purpose: Process the images of mountain data for the classfier to be trained
#          and validated with.

import tensorflow as tf
import numpy as np

def evaluateModel(model, epochs, trainDS, testDS):
  
  # perfromance 
  AUTOTUNE = tf.data.AUTOTUNE
  trainDS = trainDS.cache().prefetch(buffer_size=AUTOTUNE)
  testDS = testDS.cache().prefetch(buffer_size=AUTOTUNE)

  # Early stopping with no improvement
  es = tf.keras.callbacks.EarlyStopping(monitor='val_loss', mode='min', verbose=1,
                                        patience=10, min_delta=.001,
                                        restore_best_weights = True)
  
  # train model -use some of the training data as test data
  history = model.fit(trainDS, validation_data=testDS, epochs=epochs, callbacks=[es])
  # evaluate on completely unseen data
  loss, finalAcc  = model.evaluate(testDS, batch_size=32)

  print(f"Accuracy on the unseen dataset: {finalAcc:.2f}")

  print("Final accuracy:", finalAcc)

  model.summary()

  return finalAcc

