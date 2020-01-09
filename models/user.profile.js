const db = require('../utils/database.util');

module.exports = {
/* Dong query cho viec tim bidding list
Select DISTINCT(pd.product_id), de.model
from `user` as u, `bid` as b, `current_product` as cp , `product` as pd, `device` as de
WHERE
u.email="nguyenthaidat@gmail.com" and u.user_id=b.user_id and b.product_id=cp.product_id and cp.product_id=pd.product_id and pd.device_id=de.device_id*/
    listBidList: async email => {
        var query = "Select DISTINCT(pd.product_id) as ProductID, de.model as Model from user as u, bid as b, current_product as cp , product as pd, device as de WHERE u.email='" +email +"' and u.user_id=b.user_id and b.product_id=cp.product_id and cp.product_id=pd.product_id and pd.device_id=de.device_id"
        return  db.load(query);
    },
/* Dong query cho viec tim won list
Select DISTINCT(pd.product_id) as ProductID, de.model as Model
from `user` as u,  `wonbidlist` as wbd , `product` as pd, `device` as de
WHERE
u.email='thichdaugia@gmail.com' and u.user_id=wbd.UserWonID and wbd.ProductID=pd.product_id and pd.device_id=de.device_id
*/
    wonBidList: async email => {
        var query = "Select DISTINCT(pd.product_id) as ProductID,pd.seller_id as seller_id, de.model as Model from user as u,  wonbidlist as wbd , product as pd, device as de WHERE u.email='" +email+"' and u.user_id=wbd.UserWonID and wbd.ProductID=pd.product_id and pd.device_id=de.device_id"
        return  db.load(query);
    },
/* Dong query cho viec tim ra cac san pham dang ban va con han dau gia
Select DISTINCT(pd.product_id), de.model
from `user` as u, `bid` as b, `current_product` as cp , `product` as pd, `device` as de
WHERE
u.email="test2@gmail.com" and u.user_id=pd.seller_id and pd.product_id =cp.product_id and pd.device_id=de.device_id
*/
    PendingBidItemList: async email => {
        var query = "Select DISTINCT(pd.product_id) as ProductID, de.model as Model from user as u, current_product as cp , product as pd, device as de WHERE u.email='"+email+"' and u.user_id=pd.seller_id and pd.product_id =cp.product_id and pd.device_id=de.device_id"
        return  db.load(query);
    },
/* Dogn query cho viec tim ra cac san pham da het han va nguoi chien thang
Select DISTINCT(pd.product_id) as ProductID, de.model as Model, userwon.name, userwon.email as email, userwon.phone
from `user` as u , `product` as pd, `device` as de, `wonbidlist` wo, `user` as userwon
WHERE
u.email="test2@gmail.com" and u.user_id=pd.seller_id and pd.product_id =wo.ProductID and pd.device_id=de.device_id and wo.UserWonID=userwon.user_id
*/
    FinishedBidItemList: async email => {
        var query = "Select DISTINCT(pd.product_id) as ProductID,pd.seller_id as seller_id, de.model as Model, userwon.name, userwon.email as email, userwon.phone from user as u , product as pd, device as de, wonbidlist wo, user as userwon WHERE u.email='"+email+"' and u.user_id=pd.seller_id and pd.product_id =wo.ProductID and pd.device_id=de.device_id and wo.UserWonID=userwon.user_id"
        return  db.load(query);
    },

/* Dong query cho viec lay het danh sach tat ca cac item da dc dang truoc h 
Select DISTINCT(pd.product_id) as ProductID, de.model as Model
from `user` as u , `product` as pd, `device` as de
WHERE
u.email="test2@gmail.com" and u.user_id=pd.seller_id and pd.device_id=de.device_id 
 */
    AllBidItemList: async email => {
        var query = "Select DISTINCT(pd.product_id) as ProductID, de.model as Model from user as u , product as pd, device as de WHERE u.email='"+email+"' and u.user_id=pd.seller_id and pd.device_id=de.device_id "
        return  db.load(query);
    }
};