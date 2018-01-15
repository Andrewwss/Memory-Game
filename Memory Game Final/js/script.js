 (function() {
            var div = document.getElementById('wrapper');
            var table = document.createElement('table');
            var flag = false;
            var availibleImgArr = [
                'https://kde.link/test/0.png',
                'https://kde.link/test/1.png',
                'https://kde.link/test/2.png',
                'https://kde.link/test/3.png',
                'https://kde.link/test/4.png',
                'https://kde.link/test/5.png',
                'https://kde.link/test/6.png',
                'https://kde.link/test/7.png',
                'https://kde.link/test/8.png',
                'https://kde.link/test/9.png',
            ];
            var globalPairItemsQuantity = 0;
            var winCounter = 0;
            var value1 = null;
            var value2 = null;
            
            function requestTable() {
                var obj = {};
                var oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", "https://kde.link/test/get_field_size.php");
                oReq.send();
            }
            requestTable();

            function reqListener() {
                var textjson = this.responseText;
                obj = JSON.parse(textjson);
                createTable(obj.width, obj.height);
            }

            function createTable(width, height) {
                var pairItemsQuantity = width * height / 2;
                globalPairItemsQuantity = pairItemsQuantity;
                var newArrayItems = [];
                if (pairItemsQuantity <= availibleImgArr.length) {
                    newArrayItems = availibleImgArr.slice(0, pairItemsQuantity);
                } else if (pairItemsQuantity > availibleImgArr.length) {
                    var dublicateNumber = Math.floor(pairItemsQuantity / availibleImgArr.length);
                    var remainNumber = pairItemsQuantity % availibleImgArr.length;
                    var tempArr = [];
                    for (var k = 0; k < dublicateNumber; k++) {
                        tempArr = tempArr.concat(availibleImgArr);
                    }
                    newArrayItems = tempArr.concat(availibleImgArr.slice(0, remainNumber));

                }
                var finalItemsArr = newArrayItems.concat(newArrayItems);
                var randomSortFinalItemsArr = finalItemsArr.sort(function(a, b) {
                    return 0.5 - Math.random()
                });

                var count = 0;

                for (var i = 0; i < width; i++) {
                    var tr = document.createElement('tr');
                    for (var j = 0; j < height; j++) {
                        var td = document.createElement('td');
                        var img = document.createElement('img');
                        img.setAttribute('src', randomSortFinalItemsArr[count]);
                        count = count + 1;
                        var divTd = document.createElement('div');
                        divTd.appendChild(img);
                        td.appendChild(divTd);
                        tr.appendChild(td);
                        divTd.dataset.visibility = "hide";
                    }
                    table.appendChild(tr);
                }
                div.appendChild(table);
            }

            var hideFunc = function(parenthide) {
                var allShow = document.querySelectorAll('div[data-visibility="show"]');
                for (var i = 0; i < allShow.length; i++) {
                    allShow[i].dataset.visibility = "hide";
                    if (parenthide) {
                        allShow[i].parentNode.dataset.visibility = "hide";
                    }
                }
                flag = false;
            };

            table.addEventListener("click", function(event) {
                if (event.target !== table && !flag) {
                    event.target.firstElementChild.dataset.visibility = "show";
                    if (value1 === null) {
                        value1 = event.target.firstElementChild.firstElementChild.getAttribute('src');
                    } else {
                        value2 = event.target.firstElementChild.firstElementChild.getAttribute('src');

                        flag = true;

                        if (value1 === value2) {
                            winCounter = winCounter + 1;
                            setTimeout(hideFunc, 500, true);
                            setTimeout(function() {
                                if (globalPairItemsQuantity === winCounter) {
                                    document.getElementById('win').style.transition = 'opacity 2s';
                                    document.getElementById('win').style.opacity = '1';
                                    document.getElementById('win').style.zIndex = '1';
                                }
                            }, 600)
                        } else {
                            setTimeout(hideFunc, 500, false);
                        }
                        value1 = null;
                        value2 = null;
                    }
                }
            }, false);
            document.getElementById('play').addEventListener("click", function() {
                location.reload();
            });
        })();