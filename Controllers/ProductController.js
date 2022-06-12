const mongoose = require('mongoose')
const PRODUCT = mongoose.model('products')
const multer=require("multer")
const {
    badRequestResponse,
    successResponse,
    notFoundResponse,
    errorResponse
  } = require('../middleware/response')
  exports.product={
    getImageOptions: function (req) {
        let pathDirectory = __dirname.split('\\')
        pathDirectory.pop()
        pathDirectory = pathDirectory.join('\\')
        const uploadedFile = req.files.productImage
        const extension = uploadedFile.name.split('.')[
          uploadedFile.name.split('.').length - 1
        ]
        const fileName = `${new Date().valueOf()}_${Math.ceil(
          Math.random() * 10000,
        )}.${extension}`
        const uploadFilePath = `${pathDirectory}/uploads/${fileName}`
        return {
          fileName,
          uploadFilePath,
          uploadedFile,
        }
      },
      // upload:multer({
      //     storage:multer.diskStorage({
      //         destination:function(req,file,cb){
      //             cb(null,"uploads")
      //         },
      //         filename:function(req,file,cb){
      //             cb(null,file.fieldname+"-"+Date.now()+".jpg")
      //         }
      //     })
      // }).single("image"),
    add: async function (req, res) {
        try {

          const product = {
                shopName:req.body.shopName,
                price:req.body.price,
                offerPrice:req.body.offerPrice,
                discount:req.body.discount,
                productName:req.body.productName,
                rating:req.body.rating,
                category:req.body.category,
                productImage:""
          }
          if (req.files && Object.keys(req.files).length > 0) {
            const fileInfo = this.getImageOptions(req)
            product.productImage = fileInfo.fileName

            fileInfo.uploadedFile.mv(fileInfo.uploadFilePath, async function (err) {
              if (err)
                return badRequestResponse(res, {
                  message: 'Failed to save file',
                })

              const isCreated = await PRODUCT.create(product)
              if (isCreated) {
                return successResponse(res, {
                  message: 'User created successfully',
                })
              } else {
                return badRequestResponse(res, {
                  message: 'Failed to create user',
                })
              }
            })
          } else {
            const isCreated = await PRODUCT.create(product)
            if (isCreated) {
              return successResponse(res, {
                message: 'User created successfully',
              })
            } else {
              return badRequestResponse(res, {
                message: 'Failed to create user',
              })
            }
          }
        }
         catch (error) {
          return errorResponse(error, req, res)
        }

      },
      update: async function (req, res) {
        try {

          const productInfo = await PRODUCT.findOne({
            _id: req.body.id,
          })
          if (!productInfo) {
            return badRequestResponse(res, {
              message: 'User not found',
            })
          }
          const product = {
            shopName:req.body.shopName,
                price:req.body.price,
                offerPrice:req.body.offerPrice,
                discount:req.body.discount,
                productName:req.body.productName,
                rating:req.body.rating,
                category:req.body.category
          }
          if (req.files && Object.keys(req.files).length > 0) {
            const fileInfo = this.getImageOptions(req)
            product.image = fileInfo.fileName
            fileInfo.uploadedFile.mv(fileInfo.uploadFilePath, async function (err) {
              if (err)
                return badRequestResponse(res, {
                  message: 'Failed to save file',
                })
              await PRODUCT.findOneAndUpdate(
                { _id: productInfo._id },
                {
                  $set: product,
                },
              )
              return successResponse(res, {
                message: 'User updated successfully',
              })
            })
          } else {
            await PRODUCT.findOneAndUpdate(
              { _id: productInfo._id },
              {
                $set: product,
              },
            )
            return successResponse(res, {
              message: 'User updated successfully',
            })
          }
        } catch (error) {
          return errorResponse(error, req, res)
        }
      },
      get: async function (req, res) {
        try {

          let products = await PRODUCT.find({})

          products.map((x) => {
            if (x.image) {
              x.image = `${getHost(req)}/uploads/${x.image}`
            }
          })
          return successResponse(res, {
            data: products,
          })
        } catch (error) {
          return errorResponse(error, req, res)
        }
      },
      delete: async function (req, res) {
        try {
          const productInfo = await PRODUCT.findOne({
            _id: req.query.id,
          })
          if (!productInfo) {
            return badRequestResponse(res, {
              message: 'User not found',
            })
          }
          await PRODUCT.findByIdAndRemove({
            _id: productInfo._id,
          })
          return successResponse(res, {
            message: 'User deleted successfully',
          })
        } catch (error) {
          return errorResponse(error, req, res)
        }
      },
      getById: async function (req, res) {
        try {

          let productInfo = await PRODUCT.findOne({
            _id: req.query.id,
          })
          if (!productInfo) {
            return badRequestResponse(res, {
              message: 'User not found',
            })
          }

          productInfo.image = `${getHost(req)}/uploads/${productInfo.image}`
          return successResponse(res, {
            data: productInfo,
          })
        } catch (error) {
          return errorResponse(error, req, res)
        }
      },
  }