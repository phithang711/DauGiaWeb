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
        var query = "Select DISTINCT(pd.product_id) as ProductID, de.model as Model from user as u,  wonbidlist as wbd , product as pd, device as de WHERE u.email='" +email+"' and u.user_id=wbd.UserWonID and wbd.ProductID=pd.product_id and pd.device_id=de.device_id"
        return  db.load(query);
    }
};