import axios from "axios";
class OutfitDataService {
    getAllOutfit(page=1) {

        return axios.get(`http://localhost:3001/product/outfit?${page}`)
    }
    getOutfitById(Id) {

        return axios.get(`http://localhost:3001/product/outfit/${Id}`)
    }
    getOutfitDetails(outfitId){
        return  axios.get(`http://localhost:3001/product/outfit/${outfitId}/outfit-detail`)
    }
   
}
export default new OutfitDataService();