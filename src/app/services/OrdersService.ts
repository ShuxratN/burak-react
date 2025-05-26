import axios from "axios";
import { serverApi } from "../../lib/config";

class OrdersService {
 private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

}    

export default OrdersService;