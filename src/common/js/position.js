
/**
 * 百度地图定位 
 * PS：只精确到城市
 * @type {{}}
 */
import BMap from 'BMap'
import $ from 'jquery'
export function location(id, sucCal){
    let map = new BMap.Map(id);
    let geolocation = new BMap.Geolocation({
      maximumAge:10  // 清除缓存
    });
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        sucCal(r);
      }else {
        alert('failed'+this.getStatus());
      }        
    },{enableHighAccuracy: true})
}