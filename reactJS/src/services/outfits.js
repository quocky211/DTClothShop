import axios from "axios";
class OutfitDataService {

    async getAllOutfit(page = 1) {
        return await axios.get(`https://thawing-hollows-39647.herokuapp.com/product/outfit?page=${page}`)
    }
    async getOutfitById(Id) {

        return await axios.get(`https://thawing-hollows-39647.herokuapp.com/product/outfit/${Id}`)
    }
    async getOutfitDetails(outfitId){
        return await axios.get(`https://thawing-hollows-39647.herokuapp.com/product/outfit/${outfitId}/outfit-detail`)
    }
   
}
export default new OutfitDataService();