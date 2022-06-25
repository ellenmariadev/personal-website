const btnDev = document.querySelector('.btn-skills.dev')
const btnDesign = document.querySelector('.btn-skills.design')
const designContent = document.querySelector('.designContent')
const devContent = document.querySelector('.devContent')

btnDev.addEventListener('click', () => {
    btnDev.classList.add('active')
    btnDesign.classList.remove('active')
    designContent.classList.add('d-none')
    devContent.classList.remove('d-none')
})

btnDesign.addEventListener('click', () => {
    btnDesign.classList.add('active')
    btnDev.classList.remove('active')
    designContent.classList.remove('d-none')
    devContent.classList.add('d-none')
})


const div = document.querySelector('.repositories')

function getApiGitHub() {
    fetch('https://api.github.com/users/ellenmariadev/repos')
        .then(async res => {

            if (!res.ok) {
                throw new Error(res.status)
            }

            let data = await res.json()

            data = [data[2], data[1], data[5], data[0]]

            data.map(item => {
                let content = document.createElement('div')

                content.innerHTML = ` <div class="repo">
                <ul class="repo-ul">
                    <li class="repo-li">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </li>
                </ul>
                <ul class="tags">
                <li><a href="${item.homepage}" target="_blank" rel="noopener noreferrer">DEMO</a></li>
                <li><a href="${item.html_url}" target="_blank" rel="noopener noreferrer">CODE</a></li>
                </ul>
            </div>`


                div.append(content)

            })

        }).catch(e => console.log(e))
}

getApiGitHub()