const selectImage = document.querySelector('.browse');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.upload-area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})
imgArea.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
})


const barsEl = document.querySelector('.fa-bars')
const xmarkEl = document.querySelector('.fa-square-xmark')
const sidebarContEl = document.querySelector('.sidebar-cont')
const activeEl = document.querySelector('.active')
// const checkEl = document.querySelector('#check')

barsEl.addEventListener("click", ()=>{
	sidebarContEl.classList.remove("display")
})
xmarkEl.addEventListener("click", ()=>{
	sidebarContEl.classList.add("display")
})
activeEl.addEventListener("click", ()=>{
	sidebarContEl.classList.add("display")
})