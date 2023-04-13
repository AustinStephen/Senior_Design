# Author: Austin Stephen
# Purpose: Train the best HPO configuration of the model on all of the data and save it.
# Date: 04/11/2023
import tensorflow as tf
from numpy.random import seed
from modelAnalysis import showImages

seed(1)

# params
batchSize = 64
randomContrast = 0.25
dropoutRate = 0.4
convolutionSize = 6
denseSizeMax = 400
denseSizeLast = 30
numDenseLayers = 5
# learningRate = 0.000001
learningRate = 0.0001
numClass = 6

# Acc on the 5 fold analysis 90%

imgHeight = 128
# larger to minimize distortion
imgWidth = 250
  
# data
DS = tf.keras.utils.image_dataset_from_directory(
    './classificationModel/imagesData',
    # validation_split=0.5,
    # subset="training",
    seed = 33,
    image_size=(imgHeight, imgWidth),
    batch_size=batchSize,
    color_mode='rgb')

# showImages(DS)

# perfromance 
AUTOTUNE = tf.data.AUTOTUNE
DS = DS.cache().prefetch(buffer_size=AUTOTUNE)


# model architecture
model = tf.keras.Sequential([
  tf.keras.layers.Rescaling(1.0/255),
  tf.keras.layers.RandomContrast(factor = randomContrast),
  tf.keras.layers.Conv2D(11, 3, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Conv2D(3, 6, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Flatten(),
  tf.keras.layers.Dense(200, activation='relu'),
  tf.keras.layers.Dropout(dropoutRate, input_shape=(2,)),
  tf.keras.layers.Dense(50, activation='relu'),
  tf.keras.layers.Dropout(dropoutRate, input_shape=(2,)),
  tf.keras.layers.Dense(numClass, activation='relu')
  ])

model.compile(
  optimizer=tf.keras.optimizers.Adam(learning_rate = learningRate),
  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['accuracy'])

# Early stopping with no improvement
es = tf.keras.callbacks.EarlyStopping(monitor='loss', mode='min', verbose=1,
                                      patience=10, min_delta=.05,
                                      restore_best_weights = True)

model.fit(DS, epochs=40, shuffle=True, callbacks=[es])

# convert to probability model
probability_model = tf.keras.Sequential([model, 
                                        tf.keras.layers.Softmax()])
probability_model.build(input_shape = (None, 128, 250, 3))

# save the final model
probability_model.save("savedModels/model_V3.5")