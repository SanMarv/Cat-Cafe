let slideIndex = 1 
let cats = [{"name":"Luna", "desc":"Age: 2 years\n\nPersonality: Playful and curious. Luna loves chasing toys, exploring every corner of the house, and climbing to high places. She is very affectionate once she feels comfortable."},
            {"name":"Oliver", "desc":"Age: 4 years \n\nPersonality: Calm and friendly. Oliver enjoys lounging around and being petted. He gets along well with people and other animals, making him a perfect companion."},
            {"name":"Bella", "desc":"Age: 1 year \n\nPersonality: Energetic and mischievous. Bella is always on the move, playing with anything she can find. She is very social and loves attention."},
            {"name":"Max", "desc": "Age: 5 years \n\nPersonality: Independent and intelligent. Max likes having his own space but will come for affection on his own terms. He is observant and calm."},
            {"name":"Chloe", "desc":"Age: 3 years \n\nPersonality: Sweet and gentle. Chloe enjoys cuddling and staying close to her owner. She is quiet and very loving."}
]
function plusSlides(n){
    slideIndex += n
    showSlides()
}
async function fadeMenu(day){
    let items = document.getElementsByClassName("item")
    $(".item").fadeOut("slow", async function(){ 
        const response = await fetch(`http://localhost:4000/daily_menu/${day}`)
        const data = await response.json()
        for(let i = 0; i < items.length; i++){
            items[i].textContent = data[i].item
        }
    })
    
    $(".item").fadeIn("slow")
}
async function showSlides(){
    if(slideIndex <= 0){
        slideIndex = 5
    }
    else if(slideIndex > 5){
        slideIndex = 1
    }
    const response = await fetch(`http://localhost:4000/cats/${slideIndex}`)
    const data = await response.json()
    document.getElementById("cat_img").src = data.image
    console.log(data)
    $("#c-name").fadeOut("slow", function(){
        element = document.getElementById("c-name")
        element.textContent = data.name
    })
    $("#c-name").fadeIn("slow")
    $("#c-desc").fadeOut("slow", function(){
        element = document.getElementById("c-desc")
        element.textContent = data.description
    })
    $("#c-desc").fadeIn("slow")
}
async function changeImg(){
    const items = document.querySelectorAll(".Menu-opts li")
    items.forEach(item =>{
        item.addEventListener("mouseenter", async () =>{
            let text = item.textContent.split(".")[0].trim()
            const response = await fetch(`http://localhost:4000/menu_items/${text}`)
            const data = await response.json()
            document.querySelector(".menu-img").src = data.image
            document.querySelector(".menu-img").style.display = "block"
            
        })
        item.addEventListener("mouseleave", () =>{
            document.querySelector(".menu-img").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKoBLcdcLGpAgy82lcTNXdrOV6s3X7bwVR7A&s"
        })
    })
}

function main(){
    showSlides()
    changeImg()
}

main()