window.onload = function () {
    var sliders = document.getElementsByClassName('slider-container');
    var App = {
        //data
        container: null,
        prevButton: null,
        nextButton: null,
        pointers: null,
        sliderButtons: null,
        dididada: null,
        moving: false,
        time: null,
        zhenshu: null,
        interval: null,
        imageList:null,

        imageWidth:0,
        itemCount:0,
        imageListOffset:0,
        currentIndex: 1,
        testTime: 300,
        speed: 4,
        //functions
        initDom: function () {
            var slider_buttons = document.createElement('div');
            slider_buttons.className = 'slider-buttons';
            var ul = document.createElement('ul');
            for (var i = 0; i < this.itemCount; i++) {
                var li = document.createElement('li');
                li.className = 'slider-buttons-item';
                li.setAttribute('index', i + 1);
                var a = document.createElement('span');
                if (i == 0) {
                    a.className = 'slider-pointer slider-on';
                } else {
                    a.className = 'slider-pointer';
                }
                li.appendChild(a);
                ul.appendChild(li);
            }
            slider_buttons.appendChild(ul);

            var preDom = document.createElement('div');
            preDom.className = 'slider-prev';
            var fa_left = document.createElement('span');
            fa_left.className = 'fa fa-chevron-left';
            preDom.appendChild(fa_left);

            var nextDom = document.createElement('div');
            nextDom.className = 'slider-next';
            var fa_right = document.createElement('span');
            fa_right.className = 'fa fa-chevron-right';
            nextDom.appendChild(fa_right);

            this.container.appendChild(slider_buttons);
            this.container.appendChild(preDom);
            this.container.appendChild(nextDom);

            this.prevButton = this.container.getElementsByClassName('slider-prev')[0];
            this.nextButton = this.container.getElementsByClassName('slider-next')[0];
            this.pointers = this.container.getElementsByClassName('slider-buttons-item');
            this.sliderButtons = this.container.getElementsByClassName('slider-buttons')[0];
        },

        initTime: function () {
            while (true) {
                if (this.imageWidth % this.speed == 0) {
                    break;
                }
                this.speed++;
            }
            this.zhenshu = this.imageWidth / this.speed;
            this.interval = Math.floor(this.testTime / this.zhenshu);
            this.time = this.interval * this.zhenshu;
        }
        ,
        initFirstAndLastItem: function () {
            var helpFirstItem, helpLastItem;
            helpFirstItem = this.container.getElementsByClassName('slider-item')[this.itemCount - 1].cloneNode(true); //actual is last
            helpLastItem = this.container.getElementsByClassName('slider-item')[0].cloneNode(true);           //actual is first
            this.imageList.appendChild(helpLastItem);
            this.imageList.insertBefore(helpFirstItem, this.container.getElementsByClassName('slider-item')[0]);
        }
        ,
        ifLastItem: function () {
            return this.currentIndex == this.itemCount;
        }
        ,

        ifFirstItem: function () {
            return this.currentIndex == 1;
        }
        ,
        ifBeyondLast: function () {
            return this.imageListOffset <= (this.itemCount + 1) * (-this.imageWidth);
        }
        ,
        ifBeyondFirst: function (offset) {
            return this.imageListOffset >= 0;
        }
        ,
        animation: function (offset) {
            var times = this.zhenshu;
            move(this);
            function move(that) {
                setTimeout(function () {
                    if (times == 0) {
                        that.imageList.style.left = that.imageListOffset + offset + 'px';
                        that.imageListOffset += offset;
                        that.moving = false;
                    } else {

                        that.imageList.style.left = parseInt(that.imageList.style.left) + (offset / that.imageWidth) * that.speed + 'px';
                        move(that);
                    }
                    times--;
                }.bind(that), that.interval);
            }
                if (this.ifBeyondFirst()) {
                    this.imageList.style.left = this.itemCount * (-this.imageWidth) + 'px';
                    this.imageListOffset = parseInt(this.imageList.style.left);
                } else if (this.ifBeyondLast()) {
                    this.imageList.style.left = -this.imageWidth + 'px';
                    this.imageListOffset = parseInt(this.imageList.style.left);
                }
        },

        showPoninter: function () {
            var items = this.container.getElementsByClassName('slider-buttons-item');
            for (var i = 0; i < this.itemCount; i++) {
                items[i].getElementsByTagName('span')[0].className = 'slider-pointer';
                if (items[i].getAttribute('index') == this.currentIndex) {
                    items[i].getElementsByTagName('span')[0].className = 'slider-pointer slider-on';
                }
            }
        }
        ,
        bindNextButtonClick: function () {
            this.nextButton.onclick = function () {
                if (this.moving) {
                    return;
                }
                if (this.ifLastItem()) {
                    this.currentIndex = 1;
                } else {
                    this.currentIndex++;
                }

                this.animation(-this.imageWidth);
                this.showPoninter();
            }.bind(this)
        },
        bindPrevButtonClick: function () {
            this.prevButton.onclick = function () {
                if (this.moving) {
                    return;
                }
                if (this.ifFirstItem()) {
                    this.currentIndex = this.itemCount;
                } else {
                    this.currentIndex--;
                }
                this.animation(this.imageWidth);
                this.showPoninter();
            }.bind(this)
        },
        bindPintersClick: function () {
            var that = this;
            for (var i = 0; i < this.pointers.length; i++) {
                this.pointers[i].onclick = this.clickPointer(this);
            }
        },
        clickPointer:function (that) {
            return function (e) {
                if (that.moving) {
                    return;
                }
                var index = e.currentTarget.getAttribute('index');
                that.animation((that.currentIndex - index) * that.imageWidth);
                that.currentIndex = index;
                that.showPoninter();
            }.bind(that)
        },
        bindMouseOut: function () {
            this.imageList.onmouseleave = this.startScroll(this);
        },

        bindMouseOver: function () {
            this.imageList.onmouseover = this.stopScroll(this);
            this.prevButton.onmousemove = this.stopScroll(this);
            this.nextButton.onmousemove = this.stopScroll(this);
            this.pointers.onmousemove = this.stopScroll(this);
            this.sliderButtons.onmousemove = this.stopScroll(this);
        },
        stopScroll: function (that) {
            return function () {
                clearInterval(that.dididada);
            }.bind(that)
        },
        startScroll: function (that) {
            return function () {
                that.dididada = setInterval(function () {
                    that.nextButton.click();
                }.bind(that), that.time + 4000);
            }.bind(that)
        },

        init: function (container) {
            this.container = container;
            this.imageWidth = parseInt(window.getComputedStyle(this.container.getElementsByClassName('slider-item')[0],null)['width']);

            this.imageList = this.container.getElementsByClassName('slider-list')[0];
            this.itemCount = this.container.getElementsByClassName('slider-item').length;
            this.imageWidth = parseInt(window.getComputedStyle(this.container.getElementsByClassName('slider-item')[0],null)['width']);
            this.imageListOffset = -this.imageWidth;

            this.initDom();
            this.initTime();
            this.initFirstAndLastItem(); //在开头插入最后一张图片，在结尾插入第一张图片,用于无限循环
            this.imageList.style.left = this.imageListOffset + 'px';

            this.bindNextButtonClick();
            this.bindPrevButtonClick();
            this.bindPintersClick();
            this.bindMouseOver();
            this.bindMouseOut();
            this.startScroll(this)();
        }
    };
    for (var i = 0; i < sliders.length; i++) {
        function clone(myObj){
            if(typeof(myObj) != 'object' || myObj == null) return myObj;
            var newObj = new Object();
            for(var i in myObj){
                newObj[i] = clone(myObj[i]);
            }
            return newObj;
        }
        var app = function (container) {
            clone(App).init(container);
        };
        app(sliders[i]);
    }
}
