<!DOCTYPE html>
<html>

<head>
    <title>Memory Game</title>
    <style>
        body {
            margin: 0;
            background: linear-gradient(-90deg, rgb(60, 65, 77), rgb(0, 103, 187));
        }

        #wrapper {
            margin: 0;
            padding: 0;
        }

        #wrapper table {
            margin: 10px auto;
        }

        td {
            width: 96px;
            height: 96px;
            background: rgb(69, 128, 255);
        }

        img {
            vertical-align: middle;
        }

        td:hover {
            background: rgb(213, 255, 62);
            transition:  0.3s;
        }

        div[data-visibility='hide'],
        td[data-visibility='hide'] {
            visibility: hidden;
        }

        div[data-visibility='show'],
        td[data-visibility='show'] {
            visibility: visible;
        }

        .win {
            height: 30%;
            width: 50%;
            color: rgb(196, 236, 255);
            background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
            font-size: 70px;
            position: absolute;
            text-align: center;
            z-index: -1;
            padding-top: 100px;
            opacity: 0;
            left: 25%;
            top: 30%;
            box-shadow: 10px 10px 5px rgb(26, 26, 26);
        }
		.play {
			border: none; 
			color: white; 
			padding: 14px 28px;
			cursor: pointer;
			background-color: #4c89e0;
			display: block;
			margin: 10px auto;
		}
		.play:hover {
			background-color: #00b906;
            transition:  0.5s;
		}
    </style>
</head>

<body>
    <div id="wrapper">
        <div id="win" class="win">YOU WIN!
            <button id="play" class="play">Play again?</button>
        </div>
    </div>
    <script>
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
            var globalPairItemsQuantity = 0;

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

            var winCounter = 0;

            var value1 = null;
            var value2 = null;
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
            document.getElementById('play').addEventListener("click", function() {
                location.reload();
            });
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

        })();
    </script>
</body>

</html>
