$(window).scroll(() => {
    if (scrollY >= 135) {
        $('nav.active').css('top', 0);
    } else {
        $('nav.active').css('top', '-100px');
    }

    if (scrollY >= 700) {
        $('#arrow').css({ bottom: '20px', opacity: 1, visibility: 'visible' })
    } else {
        $('#arrow').css({ bottom: 0, opacity: 0, visibility: 'hidden' })
    }
})

let products = [{
    proName: 'Fried Chicken Unlimited',
    proCat: 'Chicken ',
    proPrice: 49,
    proDel: 69,
    proImg: 'images/food-menu-1.png',
    proSale: 15,
    proAmount: 1
}, {
    proName: 'Burger King Whopper',
    proCat: 'Noddles ',
    proPrice: 29,
    proDel: 39,
    proImg: 'images/food-menu-2.png',
    proSale: 10,
    proAmount: 1
}, {
    proName: 'White Castle Pizzas',
    proCat: 'Pizzas ',
    proPrice: 49,
    proDel: 69,
    proImg: 'images/food-menu-3.png',
    proSale: 25,
    proAmount: 1
}, {
    proName: 'Bell Burrito Supreme',
    proCat: 'Burrito',
    proPrice: 59,
    proDel: 69,
    proImg: 'images/food-menu-4.png',
    proSale: 20,
    proAmount: 1
}, {
    proName: 'Kung Pao Chicken BBQ',
    proCat: 'Nuggets',
    proPrice: 49,
    proDel: 69,
    proImg: 'images/food-menu-5.png',
    proSale: 5,
    proAmount: 1
}, {
    proName: "Wendy's Chicken",
    proCat: 'Chicken',
    proPrice: 49,
    proDel: 69,
    proImg: 'images/food-menu-6.png',
    proSale: 15,
    proAmount: 1
}];

let temp = '';
for (let i = 0; i < products.length; i++) {
    temp += `<div class="card">
                <div class="imgDiv">
                    <div class="sale">
                        <p>-${products[i].proSale}%</p>
                    </div>
                    
                    <img src="${products[i].proImg}" alt="">
                </div>

                <div class="cardInfo">
                    <p>${products[i].proCat} <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span></p>
                    <p class="proName">${products[i].proName}</p>
                    <p>Price: <span>$ ${products[i].proPrice.toFixed(2)}</span> <del>$${products[i].proDel.toFixed(2)}</del></p>
                </div>
                <button class="btn order" onclick="addProduct(${i})">Order Now</button>
            </div>`;
}

$('.cards').html(temp);


$(document).ready(function () {
    $('.cards').slick({
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '.prev',
        nextArrow: '.next',
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 2,
                    prevArrow: '',
                    nextArrow: ''
                }
            }, {
                breakpoint: 770,
                settings: {
                    slidesToShow: 1,
                    prevArrow: '',
                    nextArrow: ''
                }
            }
        ]
    });
});

$('.fa-cart-shopping').click(() => gate('open'));
$('.fa-square-xmark').click(() => gate('close'));
$('.blurry').click(() => gate('close'));

function gate(action) {
    if (action == 'open') {
        $('.blurry').addClass('open');
        $('.menu').addClass('open');
    } else {
        $('.blurry').removeClass('open');
        $('.menu').removeClass('open');
    }
}

let arr;

//create
function addProduct(index) {
    let found = arr.find((el) => {
        return el.proName == products[index].proName;
    });
    if (!found) {
        let copy = { ...products[index] };
        arr.push(copy);
        displayProducts();
        $('.added').css('left', '20px');
        setTimeout(() => {
            $('.added').css('left', '-300px');
        }, 2000)

        localStorage.setItem('array', JSON.stringify(arr));
    }
}

//read
function displayProducts() {
    let temp2 = '';
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        temp2 += `<div class="proInCart">
                <img src="${arr[i].proImg}" alt="">
                <div>
                    <p>${arr[i].proName}</p>
                    <p>$ ${arr[i].proPrice.toFixed(2)}</p>
                </div>
                <div>
                    <button onclick="inc(${i})"><span>+</span></button>
                    <span class="amount">${arr[i].proAmount}</span>
                    <button onclick="dec(${i})"><span>-</span></button>
                    <i class="fa-solid fa-trash" onclick="deleteProduct(${i})"></i>
                </div>
            </div>`;
        total += arr[i].proAmount * arr[i].proPrice;
    }
    if (arr.length == 0) {
        $('.prosInCart').html('<b>No Products Added Yet!</b>');
    } else {
        $('.prosInCart').html(temp2);
    }

    $('.total').text('$' + total.toFixed(2));
}

//Delete
function deleteProduct(index) {

    arr.splice(index, 1);
    localStorage.setItem('array', JSON.stringify(arr));
    displayProducts();
}

function inc(index) {
    arr[index].proAmount++;
    localStorage.setItem('array', JSON.stringify(arr));
    displayProducts();
}

function dec(index) {
    if (arr[index].proAmount > 1) {
        arr[index].proAmount--;
        localStorage.setItem('array', JSON.stringify(arr));
        displayProducts();
    } else {
        deleteProduct(index);
    }
}

//store
$(window).on('load', () => {
    let stored = localStorage.getItem('array');
    let mode = localStorage.getItem('mode');

    if (stored) {
        arr = JSON.parse(stored);
    } else {
        arr = [];
    }

    if (mode) {
        $('select').val(mode);
        applyMode(mode);
    }

    displayProducts();
})

let originalBgs = [];
$('section').each(function (i) {
    originalBgs[i] = $(this).css('background');
});

$('select').change(function () {
    let val = $(this).val();

    applyMode(val);
});

function applyMode(val) {
    $('section').each(function (i) {
        if (val === 'dark') {
            $(this).css('background', '#000');
            $('section > img').css('display', 'none');
            $('h2').css('color', "#fff");
            $('h3').css('color', "#fff");
            $('h5').css('color', "#fff");
            $('.heading2').css('color', "#fff");
            $('strong').css('color', "#fff");
        } else if (val === 'green') {
            $(this).css('background', 'green');
            $('section > img').css('display', 'none');
        } else if (val === 'purple') {
            $(this).css('background', 'purple');
            $('section > img').css('display', 'none');
        } else {
            $(this).css('background', originalBgs[i]);
            $('section > img').css('display', 'block');
            $('h2').css('color', "#000");
            $('h3').css('color', "#000");
            $('h5').css('color', "#000");
            $('.heading2').css('color', "#000");
            $('strong').css('color', "#000");
        }

        localStorage.setItem('mode', val)
    });
}

let opened = false;
$('.fa-list.notActive').click(() => {
    if(!opened) {
        $('.notActiveUl').css('transform' , 'translateX(0)');
        opened = true;
    } else {
        $('.notActiveUl').css('transform' , 'translateX(-1000px)');
        opened = false;
    }
})

let opened2 = false;
$('.fa-list.active').click(() => {
    if(!opened2) {
        $('.activeUl').css('transform' , 'translateX(0)');
        opened2 = true;
        if($('.notActiveUl').css('transform' , 'translateX(0)')) {
            $('.notActiveUl').css('transform' , 'translateX(-1000px)');
        opened = false;
        }
    } else {
        $('.activeUl').css('transform' , 'translateX(-1000px)');
        opened2 = false;
    }
})

