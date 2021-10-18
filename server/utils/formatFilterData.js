const formatFilterData = (filter) => {
    let result = {}
    if(filter){
        for (const [key, value] of Object.entries(filter)) {
            if(value.date){
                if(value.from && value.from != ""){
                    result[key] = {
                        $gte: value.from
                    }
                }
                if(value.to && value.to != ""){
                    result[key] = {
                        ...result[key],
                        $lte: value.to
                    }
                }
            } else {
                if(value.value != ""){
                    result[key] = {
                        $regex: value.value,
                        $options: 'i'
                    }
                }
            }
        }
    }
    return result;
}

module.exports = formatFilterData;