<template>
    <div id="statement">
        <headerTool ref='headerTool' :titleJson='titleJson'></headerTool>
        <div class="statement-tip">大家有任何建议都可以发送到这儿</div>
        <div class="statement">
            <div class="container space-between">
                <span class='statement-num'>共389条发言</span>
                <span class='statement-sort' @click="show_sort($event)">最热发言</span>
            </div>
        </div>
        <div class="list-box">
            <div class="state" v-on:click='statement_details(1)'>
                <div class="state-top container space-between">
                    <div class="state-tx">
                        <img src="data:image/jpeg;base64,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" alt="">
                    </div>
                    <div class="state-inf center-v">
                        <span class="state-name">赵长安</span>
                        <img class='state-img' src="../../assets/statement/phone.png" alt="">
                        <span class='state-model'>OPPO K3 </span>
                        <span class='state-version'>V2.3.3</span>
                    </div>
                    <div class="state-ellipsis" @click.stop='complaint($event,1)'>
                        <img src="../../assets/statement/ellipsis.png" alt="">
                    </div>
                </div>
                <div class="state-middle">
                    <div class="middle-txt container">
                        日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新
                    </div>
                    <div class="middle-img-list" v-if='false'>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                    </div>
                </div>
                <div class="state-bottom container space-between">
                    <div class="state-operate center-v">
                        <img src="../../assets/statement/discuss.png" alt="" v-on:click='show_input()'>
                        16
                        <img class='up' src="../../assets/statement/upGray.png" alt="" v-if='false'>
                        <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if='true'>
                        <span :class='{"like": true}'>52</span>
                    </div>
                    <div class="state-time">
                        今天 11:53
                    </div>
                </div>
                <div class="state-gray"></div>
            </div>
            <div class="state" v-on:click='statement_details(1)'>
                <div class="state-top container space-between">
                    <div class="state-tx">
                        <img src="data:image/jpeg;base64,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" alt="">
                    </div>
                    <div class="state-inf center-v">
                        <span class="state-name">赵长安</span>
                        <img class='state-img' src="../../assets/statement/phone.png" alt="">
                        <span class='state-model'>OPPO K3 </span>
                        <span class='state-version'>V2.3.3</span>
                    </div>
                    <div class="state-ellipsis" @click.stop='complaint($event,1)'>
                        <img src="../../assets/statement/ellipsis.png" alt="">
                    </div>
                </div>
                <div class="state-middle">
                    <div class="middle-txt container">
                        日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新
                    </div>
                    <div class="middle-img-list" v-if='false'>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                    </div>
                </div>
                <div class="state-bottom container space-between">
                    <div class="state-operate center-v">
                        <img src="../../assets/statement/discuss.png" alt="" v-on:click='show_input()'>
                        16
                        <img class='up' src="../../assets/statement/upGray.png" alt="" v-if='true'>
                        <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if='false'>
                        <span :class='{"like": false}'>5</span>
                    </div>
                    <div class="state-time">
                        今天 11:53
                    </div>
                </div>
                <div class="state-gray"></div>
            </div>
            <div class="state" v-on:click='statement_details(1)'>
                <div class="state-top container space-between">
                    <div class="state-tx">
                        <img src="data:image/jpeg;base64,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" alt="">
                    </div>
                    <div class="state-inf center-v">
                        <span class="state-name">赵长安</span>
                        <img class='state-img' src="../../assets/statement/phone.png" alt="">
                        <span class='state-model'>OPPO K3 </span>
                        <span class='state-version'>V2.3.3</span>
                    </div>
                    <div class="state-ellipsis" @click.stop='complaint($event,1)'>
                        <img src="../../assets/statement/ellipsis.png" alt="">
                    </div>
                </div>
                <div class="state-middle">
                    <div class="middle-txt container">
                        日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新
                    </div>
                    <div class="middle-img-list" v-if='false'>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                    </div>
                </div>
                <div class="state-bottom container space-between">
                    <div class="state-operate center-v">
                        <img src="../../assets/statement/discuss.png" alt="" v-on:click='show_input()'>
                        16
                        <img class='up' src="../../assets/statement/upGray.png" alt="" v-if='false'>
                        <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if='true'>
                        <span :class='{"like": true}'>52</span>
                    </div>
                    <div class="state-time">
                        今天 11:53
                    </div>
                </div>
                <div class="state-gray"></div>
            </div>
            <div class="state" v-on:click='statement_details(1)'>
                <div class="state-top container space-between">
                    <div class="state-tx">
                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAGBAUGBQQGBgUGBwcGCAoQCgoJCQoUDg8MEBcUGBgXFBYWGh0lHxobIxwWFiAsICMmJykqKRkfLTAtKDAlKCko/9sAQwEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8AAEQgA/wD/AwEhAAIRAQMRAf/EABwAAQABBQEBAAAAAAAAAAAAAAAGAQIEBQcDCP/EADwQAAEEAQIEAwYDBQcFAAAAAAABAgMEBQYREiExQQcTURQiMmGBkRYjcSQzQlNiCBUXNHKh8DVEUrHB/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAeEQEBAQEAAwEAAwAAAAAAAAAAARECAyExEiJBUf/aAAwDAQACEQMRAD8A+qQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALXyMjbxPcjU9VXYC2GxDPv5Mscm3Xhci7fYrK9sUbnvXZrUVVX5JzA50/xu8PmSLGuoN3pz4W0rCrt67JGbHS/ihpTVGUbQweRnt2Xuc3ZKU7GorU3VFc5iI3l67ATcAAAAAAAAAAAAAAAAAAAAADhX9onBabWtJYtVXyZ3KtWNs755XsqV4m8U1nykdw+5GnZN1cqd15hMvDWnoTFZK5jNH1qdXJQQQ+0NbEscs0TmI5ki7p77V3ReJO6qdAmVzY3KxqvciKqNRdlX5AcHj1Tqf8AxmuWo9BZN1z+4YYX01yFZHtZ7RIrZOPj4dlXiTbffkqmV4O5TVUmptWwN07Tq0JM/JPcSxkPzqznxsVyNaxrmv5Ii/EnXYDp3iLn36X0RmczCyOSxUrq6BknwvlVUbG1duyuVqfUglS/rC/qTXEOIyNduRx1nGeVUt7+z8C1mvmjTqrONzne9zXdEAltzUVy1qduFwba/tdCWvNk47TVRq1ZWvTihenVyK3unPbYmKdEAAAAAAAAAAAAAAAAAAABFtSaJxueny1m06ZLeQxUmIWTi3SGF/FxKxvRFVXIqr34U9AMrH6UxldMFNarxWsjh67a9a69m0rU4OB3NOypvy6czfOXZOQEQxeAuw+JGoM/aWJa1mlVp1Gtdu5Gxq9z+JNuXvP5FNBafuYXK6utXkjRMnl324OB/F+V5bGoq+i7o7kBLLVeG1A6GzFHNE5UVWSNRzV2XdOS/NEUiGpvDzH5zNLmK+SzOFyz42wy2sVb8h0zG/C16Kjmu2589twMnR+iKmmb96+mSy2VyN1rI5beTsJNJwM3VrE2a1EaiuVenclYAAAAAAAAAAAAAAAAAAAAAKm/UCnCgRqJ3AqAAADdAG5artgNJmtV4XDP8vI5GCGX+XvxO+yczJwmdx2cqusYu0yxE1eFys6ovoqdguNogCAAAAAAAAAAAAAAALJHIxquc7ZqJuqr2OcS65zmUtzfhbDQz0Inqz2q1IrWyqnXhROwWTXpFrzN1fdyulbiqnV9R6SN+idTNg8SsUqftNPK1nd0kqO2T6g/K3I+J+Bqw7w+22Z3co4Ia7le9fToayhqzWWUstkiwVPGUN+l2RVlVPXZF5Ea/LY6yympHYtjtNzVILTHo6RJY1fxN7onPqRKHWOqPxA2exarpSYzhWmkO3E71VeqFSYmj9RZPIYZ7sUlOPIdE85FVn+3MgGQ1RqVt1aWtLcmHpPXZtqhF+W75K9d+ELzmpXg9P4ei1LFKNliST3va5HJI9+/fc8tNPbV8WL9aBEZFYoMmkazpxou2+3rsRc+unp0QFcwAAAAAAAAAAAAAAGFmYnz4q5FF+8fC9rf1VFRDm3hrI12jaVfpPVV0EzVXm16Ku+4a5qTovPkqjiVe/3DO0ThRUVGt3Tuic0C9SLtE6mmzuIbejR8XCyVu/ROpUjWaemdTueU/wCF/JUUlFyvBcqyV7cbJoJE2ex6cSOQNS5XOri3PDWRbEKS3tKPVVdCnOSmv9Pq1V2Jj4UY6zbS3qvJI1tzKonlRN5pFA34U/Veqkatma6M3oVK5gAAAAAAAAAAAAAAKKm5zbVukX47I29RYDKR4yZyK+1FOm8E3Lmq+ikWNFpTWk+Qy0eMzdaKpPOzzKkrXKjLCJ1236E4VF57lWxQBkAEeztd0FuGyxPdVeZII3I6Nrk7puFqk8UViF8M7EkikRWua7mip8yMaEuP0hqr8KzqrsVe4p8bI5fgXq6L79CLPcx1hq7oVKyAAAAAAAAAAAAAAAoqnLdXX11VrBmnoOJcVjlSbIOTo9/Vkfz9VJWuPrPz+n8bnabauQrtVjF3icz3XRr/AEqnQpp3CxYOssEFm1OzfdPaH8aoIW+21BWQAY9+NstVzXc+6F9VU8iPbptsB7IRbxHqSS6ddfq/53GPbchcnXdqpxJ9U3IsuOkYDIsyuFpX4vgsRNkT6obAqAAAAAAAAAAAAAAO4Ed17n26b01bv7K6ZESOFn/lI7k1PuRXRmKdisHH7Vs/I2Pz7cvd0juYanrnW9AZEQAUAFHIjk2XoGNa1vC3oBciL2KTwtngkikaite1WqnyXkQj18N4fY9Mx0d+VWV8Sb+iLyJWUoAAAAAAAAAAAAAFFUDmmu50zOusLgtt4KjVyFhPXbkxF+vM3rl5qGr8eLZ41uJVau86t4uFOyepkcDkXmmw1li5jJ0cLjZL2UsMrVI1RHSv6Iq9CMN8T9FvkbGzOQLI5dk91eq/QWtTjZqYoiORHN22Xmi+paqcwyoXIiARHX/iBi9D+yNycFmWSyjlYkLUVNk67qpleHmsqWuMVYvUIJYGQyrErZe/fclrc8f8dStcvTwkkTLbHQw2n/v0T3ONeWzvQkrXI5EVF5KNZzFwKgAAAAAAAAAAAKKuxodW6mpaboNntq500rvLggYm75X+iIFntC9O469Jlr+oMyxsWQvNaxtdq7pBGnRv67dSQyyNhjfJJyYxqucq+iIFYnh+z2zGyZqdN5sg9zmqqdI0XZqJ9iSSNa5PhQzrpOUM8S9Jzas0hfxNeRI5n7SROXpxtXdEX9ThejvAPVE2YgfnooKNCGRHyK2RHuk2XfZqIT63OpzMfTrqz2tThYqInJE9E/4hjOaqKu5t5lilzNu4EU8S/D+rrzF1q80rq9is/iima3i2ReqKhufD7RVLRuAixtRz5PeWSWR3J0j17qZsduetmJHfp1sjQlpXIWy15Wq1zF/51I94fXLdDJZHTOTnfPLT2lqyv5ufXXpuvqi8hE759J6DTkAAAAAAAAAAADCy2QrYvHz3r0rYq8DFe9y9kQ5dpevbz+RfqjOtVZJd20IHdIIV6KieqoGol6rvv8zTaze+LSWXkj+JKztiVJ9bvRjGxaOwrYubPZI+n6bm0MPTxPS5m6qZ8Lfd5IWMeX09dt+S9DGlqwvVd2JzNuDT5N2Note61dgrI3ZF8x6Jsq9DNo04HxtlZI2Zjk3a9q7ooGwSJrGKjURDDeipv6krp41jU3Uhtpy/4y4ZIPiXGS+cidm8XLf6kjp26QDTzgAAAAAAAAAAUDlvibM7UWocbpWB6+yt/a8jw/y0+Fi/qpImtaxrWsREY1OFqJ2ROxGr8DyvU2ZChYqSfBPG6NfqmwrP9tb4Y5Hy8Y7TeRckeWxSrEsbuSvj3916eqbEzczZfUj0830NbzM6v8IY8l16qebmmnFHJtI0LGsF1Bab50/s/s7InpuxvPm7b17G9o069Gu2CpE2GFqqqMamyJuBkrzPCWLqStc3Gg1PnaGm8e+1kZkaqJ+XCnN8ruzWt6qppvDPF5Cezd1RqGHycnkdmxQL/wBvAnwt/VeqiN93Y6CCuQAAAAAAAAAAWyKjWK5eiJuoHKNEwOtXM1nrHObIWVaz5RMXZqJ/uSpSRrpQz8ZCj38bu3QrLB1XpGDNzQX6k0lDM1v3FyLr/pcndpofxRqDT7/J1ZhZbEDV/wCoY9qvaqerm9UUljpzW8xWs9OZDbyMvXa/+XOvlu+y7Ekr3asrUWKzA9F6cMjV/wDpDrWSksa9Ht+6FyK13RdzTmKiKV2TYCiryIU2bKZ/M5elWyr8a2hKkfDFE1yuRU3Rd1JSL8P4fYunlW5TITWsrkWLuya5Jx+X/pb0QmaJyEW1UFQAAAAAAAAAANfn8jWxGGu376qlWvE6SRUTddkAieDnp2sRUnxjeGlKxJIk+S8zNUkWr4Y3SvRGoqm9pVfKYiKq7lRmIiINkA1OT07iMpumQxtSffu6NN/uRX8AaOmvSQQQRxWY/iiinVqt+iKTGp096uJ0/g9Q0sWytOk1uN0kT5JnOaqt6pzXqTiJiMbwtRGonREQqVf0C9OYRp4swyfUU+Lhj41giR8siLyYq9G/qRWve/DniHehyUSsr5uRjqtrf3ONrdvLd6L6Eax0JvNCu5WQAAAAAAAAAAADCzESTYy1G6u2yjo3J5Luj+XRQIrQjSKlXY2BldrWInlM6M5dE2MpjFkdsgWt/QrtiYi7e93UzE5JyCAAEV1loylqFrbEUj6OWi96G7AvC9qp039U/UEQG9k85fzmExWVxszc5jbbXpbibvDPF0c7fty6odpb3I11P8VPK0sja8joU4pEaqtT1XsVlyvSGO1dbyDPb67cTTSy6xblV/FLcdvyby6NRCdaxwMWocBbx8nJ72q6KRE5xvTm1yfopG+q13hhmp8zpZnt/wDn6cjqdj5vZy3+qbKS9CsX6qAAAAAAAAAAABiZRZW4+06tt57YnKz/AFbLsBCdN5FMthKtz+N7VR6ejkXZyfc32Oj4pwtSBqbImxUIAAV2QCnA3fdE5+pVE2IuqgqLeHYKmxBAvDxEj1LrSKPZIkyKORE6bqxNyfbFa6+qgMgAAAAAAAAABRyIqbL0A5VLXbovV0sNlyswOWk4q7v4a8/dq+iOOg46BIlVfi37hq/Gyb0K7BkAAqAQqAABSjl2TcCB+FbXTQ5/IPRN7mTlc1fVqbIn/onoXoAQAAAAAAAAAALJXpHG97uTWoqqBzfKy2/ESh7HQppDg3ybSW59uN6NX+BvVF37kl0zXnxMSY67kI7aRpwwve9EkVvZHJ3UNWekjavLbuXBkKbAEG/LnyAqijiAcXyHEnqAVydCFeIGpnVY2YPCu8zUF9PLgY3n5KLyWR3oiJ6hZNbzSGDj0/p+pj43q9Y27yPXq96/Ev3N0EvsAAAAAAAAAAAAo9qPaqLzReSoBC7Hh9jlmlfQu5LHslcrnRVbCtZxL1VE7fQ82+GWnWwPRYrTrTua23WX+ai+qLuGtYb8VrnAuVuGyNXM0k5NhvJwSNT0406l7daalrN2yGicgr2/EtaRr2r+nMkWZVU8TK8XK9gM9WenVq1Fdt9UNZmvGGtj2NdFp3OzI7o5aysRS6s41pa/je65xsjw/sL06OuvVqfZE3LtI6u1dq/Oz0Ib2PqwMj8z2ipCsjU/p3d3Jq3j8/U3foy7cZtk9TZaVVTb8lyRJ9Njwh8NMdE9H/3pnHv9XXXKVidMh2iJYk3x+osxWenRXSpIn2U8nYLWcSbQapgkb286mir/ALBb1KwshpfW1+s6N+sm1V7ezVWt+6ke014b6hxGqamTXI13TNk/abSvc6SdndqovIhOp8dmamybFSsAAAAAAAAAAAAAANgKKnLoURPkBVWopa+Jj02c1HJ80C7WNJjaUq7yU67l9XRop616sFZFSvBFEi9UYxG7/YG17gIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z" alt="">
                    </div>
                    <div class="state-inf center-v">
                        <span class="state-name">赵长安</span>
                        <img class='state-img' src="../../assets/statement/phone.png" alt="">
                        <span class='state-model'>OPPO K3 </span>
                        <span class='state-version'>V2.3.3</span>
                    </div>
                    <div class="state-ellipsis" @click.stop='complaint($event,1)'>
                        <img src="../../assets/statement/ellipsis.png" alt="">
                    </div>
                </div>
                <div class="state-middle">
                    <div class="middle-txt container">
                        日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新
                    </div>
                    <div class="middle-img-list" v-if='false'>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                    </div>
                </div>
                <div class="state-bottom container space-between">
                    <div class="state-operate center-v">
                        <img src="../../assets/statement/discuss.png" alt="" v-on:click='show_input()'>
                        16
                        <img class='up' src="../../assets/statement/upGray.png" alt="" v-if='false'>
                        <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if='true'>
                        <span :class='{"like": true}'>52</span>
                    </div>
                    <div class="state-time">
                        今天 11:53
                    </div>
                </div>
                <div class="state-gray"></div>
            </div>
            <div class="state" v-on:click='statement_details(1)'>
                <div class="state-top container space-between">
                    <div class="state-tx">
                        <img src="data:image/jpeg;base64,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" alt="">
                    </div>
                    <div class="state-inf center-v">
                        <span class="state-name">赵长安</span>
                        <img class='state-img' src="../../assets/statement/phone.png" alt="">
                        <span class='state-model'>OPPO K3 </span>
                        <span class='state-version'>V2.3.3</span>
                    </div>
                    <div class="state-ellipsis" @click.stop='complaint($event,1)'>
                        <img src="../../assets/statement/ellipsis.png" alt="">
                    </div>
                </div>
                <div class="state-middle">
                    <div class="middle-txt container">
                        日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新日子增加个排序功能呗，加个小记的导入导出功能呗，后期会做网页端吗。一直盯着探记的更新
                    </div>
                    <div class="middle-img-list" v-if='false'>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img2.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img3.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                        <div class="middle-img"> <img src="../../assets/statement/user-img1.png" alt=""> </div>
                    </div>
                </div>
                <div class="state-bottom container space-between">
                    <div class="state-operate center-v">
                        <img src="../../assets/statement/discuss.png" alt="" v-on:click='show_input()'>
                        16
                        <img class='up' src="../../assets/statement/upGray.png" alt="" v-if='false'>
                        <img class='up' src="../../assets/statement/upGreen.png" alt="" v-if='true'>
                        <span :class='{"like": true}'>52</span>
                    </div>
                    <div class="state-time">
                        今天 11:53
                    </div>
                </div>
                <div class="state-gray"></div>
            </div>
        </div>
        <div class="input-box">
            <div class="input container space-between">
                <img src="../../assets/statement/phone.png" alt="">
                <span>我要发言...</span>
            </div>
        </div>
        <div class="pop">
            <div class="list-tip" v-on:click='complaint_item()' :class='{"unshow": clickKind != "list-tip"}'>
                <div class="center-vh">
                    <span></span>举报
                </div>
            </div>
            <ul class="list-sort" :class='{"unshow": clickKind != "list-sort"}'>
                <li class='center-vh' v-for='(i,index) in sortList' :key = 'index' :class="{'chosen': i.chosen}" v-on:click='chose_sort(i)'>{{i.title}}</li>
            </ul>
        </div>
        <div class="pop-txt">
            <textarea name="" id="" cols="30" rows="10" placeholder="评论点什么..."></textarea>
        </div>
    </div>
</template>
<script src='./statementList.js'></script>
<style lang="less" scoped>
    @import '../../style/stateList.less';
    @import './statementList.less';
</style>
