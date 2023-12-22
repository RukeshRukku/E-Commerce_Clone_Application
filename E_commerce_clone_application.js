const list_items = document.getElementById("men")
let list;
const men = document.getElementById("btn1")
const women = document.getElementById("btn2")
const kids = document.getElementById("btn3")

const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
const options = {
    method: "GET"
}

const percentageCalculator = (a, b) => {
    const first = a;
    const second = b;
    const diff = first - second;
    const offerPercentage = (diff / first) * 100
    return Math.round(offerPercentage)
    
}


const designing_html = (data) => {
    const card_con = document.createElement("div");
    card_con.classList.add("card_con");
    list_items.appendChild(card_con)

    const image = document.createElement("div")
    image.style.backgroundImage = `url(${data.image})`;
    image.classList.add("img")
    card_con.appendChild(image)

    const badge = document.createElement("p");
    badge.textContent = data.badgeText;
    badge.classList.add("badge")
    if(data.badgeText !== null){
        image.appendChild(badge)
    }

    const con1 = document.createElement("div")
    con1.classList.add("flex")
    card_con.appendChild(con1)

    const title = document.createElement("h1");
    if (data.title.length > 11) {
        title.textContent = `${data.title.substring(0, 10)}..`;
    }else{
    title.textContent = `${data.title}`
    }
    title.classList.add("title")
    con1.appendChild(title)

    const span = document.createElement("span");
    span.textContent = "|"
    span.classList.add("span")
    con1.appendChild(span)

    const vendor = document.createElement("p");
    vendor.textContent = data.vendor;
    vendor.classList.add("vendor")
    con1.appendChild(vendor)

    const con2 = document.createElement("div")
    con2.classList.add("flex")
    card_con.appendChild(con2)

    const price = document.createElement("p");
    price.textContent = `Rs ${data.price}.00`
    price.classList.add("price")
    con2.appendChild(price)

    const price1 = document.createElement("p");
    price1.textContent = `${data.comparePrice}.00`
    price1.style.textDecoration = "line-through";
    price1.style.color = "gray";
    con2.appendChild(price1)

    const offer = document.createElement("p");
    const comparePrice = parseInt(data.comparePrice)
    const sellingPrice = parseInt(data.price)
    const percentage = percentageCalculator(comparePrice, sellingPrice)
    offer.textContent = `${percentage}% Off`;
    offer.classList.add("offer");
    con2.appendChild(offer)

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.classList.add("btnCart")
    card_con.appendChild(button)
}

const list_arrange = (data) => {
    data.category_products.map(each => {
        const main_data = {
            image: each.image,
            badgeText: each.badge_text,
            comparePrice: each.compare_at_price,
            price: each.price,
            secondImage: each.second_image,
            title: each.title,
            vendor: each.vendor
        }
        designing_html(main_data)
    })

}

const data = async(num) => {
    await fetch(url, options).then((res) => {
        return res.json()
    }).then((data) => {
        list = data
        console.log(list)
        list_arrange(list.categories[num])
    })
}

function myFirstFunction() {
    list_items.textContent = ""
    btn1.classList.add("btn2")
    btn2.classList.remove("btn2")
    btn3.classList.remove("btn2")
    data(0)
}

function mySecondFunction() {
    list_items.textContent = ""
    btn1.classList.remove("btn2")
    btn2.classList.add("btn2")
    btn3.classList.remove("btn2")
    data(1)
}

function myThirdFunction() {
    list_items.textContent = ""
    btn1.classList.remove("btn2")
    btn2.classList.remove("btn2")
    btn3.classList.add("btn2")
    data(2)
}

btn1.addEventListener("click", myFirstFunction)
btn2.addEventListener("click", mySecondFunction)
btn3.addEventListener("click", myThirdFunction)


data(0)