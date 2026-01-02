exports.createModel = async (Model, data, message) => {

    return await Model.create(data)

        .then(() => ({
            success: true,
            message
        })
        )
        .catch((err) => ({
            success: false,
            message: err.message
        })
        )
}

exports.viewModel = async (Model) => {
    return await Model.find()
        .then((records) => ({
            success: true,
            records: records.length > 0 ? records : []
        })
        )
        .catch((err) => ({
            success: false,
            message: err.message
        })
        )
}

exports.viewPopulateModel = async (Model, populateId, selecteOption) => {
    //    return  await Model.find().populate(populateId)
    //    return  await Model.find({},{}).populate(populateId)
    return await Model.find({}, {}).populate({
        path: populateId,
        select: selecteOption
    })
        .then((records) => ({
            success: true,
            records: records.length > 0 ? records : []
        })
        )
        .catch((err) => ({
            success: false,
            message: err.message
        })
        )
}

exports.viewMorePopulateModel = async (Model, populateId1, selecteOption1, populateId2, selecteOption2) => {
    //    return  await Model.find().populate(populateId)
    //    return  await Model.find({},{}).populate(populateId)
    return await Model.find({}, { __v: 0 })
        .populate({
            path: populateId1,
            select: selecteOption1
        })
        .populate({
            path: populateId2,
            select: selecteOption2
        })
        .then((records) => ({
            success: true,
            records: records.length > 0 ? records : [] // problem in Front-end side ---> "No Records Found!!"
        })
        )
        .catch((err) => ({
            success: false,
            message: err.message
        })
        )
}