# Author: Austin Stephen
# Date: 01/24/2023
# Purpose: Augment the mountain images data

import matplotlib.pyplot as plt
  
def plotTraining(history):
  """Plots the training epocs with loss and accuracy over time.

  Args:
      history (tf array): The data read in from a directory 
  """
  # summarize history for accuracy
  plt.plot(history.history['accuracy'])
  plt.plot(history.history['val_accuracy'])
  plt.title('model accuracy')
  plt.ylabel('accuracy')
  plt.xlabel('epoch')
  plt.legend(['train', 'test'], loc='upper left')
  plt.show()

  # summarize history for loss
  plt.plot(history.history['loss'])
  plt.plot(history.history['val_loss'])
  plt.title('model loss')
  plt.ylabel('loss')
  plt.xlabel('epoch')
  plt.legend(['train', 'test'], loc='upper left')
  plt.show()
  
def printData(DS):
    # Check you got the correct classes
  print("class name: ", DS.class_names)

  # check train data dimensions 
  for image_batch, labels_batch in DS:
    print("image batch shape: ", image_batch.shape)
    print("label batch shape: ", labels_batch.shape)

def showImages(DS):
  class_names = DS.class_names

  plt.figure(figsize=(10, 10))
  for images, labels in DS.take(1):
      for i in range(16):
          ax = plt.subplot(4, 4, i + 1)
          plt.imshow(images[i].numpy().astype("uint8"))
          plt.title(class_names[labels[i]])
          plt.axis("off")
  plt.show()