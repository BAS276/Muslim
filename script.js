
////////////////////////////////////////////////////
//remove Page//////////remove Page//////////////////
////////////////////////////////////////////////////
//remove Page
let Home = document.getElementById('Home')
let main = document.getElementById('main')
Home.onclick = function () {
    mainsalat.remove()
    mainLive.remove()
    mainmoshaf.remove()
    mainkoran.remove()
    document.body.appendChild(main);
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
let koran = document.getElementById('koran')
let mainkoran = document.getElementById('mainkoran')
koran.onclick = function () {
    main.remove()
    mainsalat.remove()
    mainLive.remove()
    mainmoshaf.remove()
    document.body.appendChild(mainkoran);
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
let moshaf = document.getElementById('moshaf')
let mainmoshaf = document.getElementById('mainmoshaf')
moshaf.onclick = function () {
    main.remove()
    mainsalat.remove()
    mainLive.remove()
    mainmoshaf.remove()
    mainkoran.remove()
    document.body.appendChild(mainmoshaf);
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
let live = document.getElementById('live')
let mainLive = document.getElementById('mainLive')
live.onclick = function () {
    main.remove()
    mainsalat.remove()
    mainmoshaf.remove()
    mainkoran.remove()
    document.body.appendChild(mainLive);
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
let salat = document.getElementById('salat')
let mainsalat = document.getElementById('mainsalat')
salat.onclick = function () {
    main.remove()
    mainLive.remove()
    mainmoshaf.remove()
    mainkoran.remove()
    document.body.appendChild(mainsalat);
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////






////////////////////////////////////////////////////
//AudioControls//////////AudioControls//////////////
////////////////////////////////////////////////////
//AudioControls
var article = document.querySelectorAll(".article");
var audios = document.querySelectorAll(".article audio");
////////////////////////////////////////////////////
////////////////////////////////////////////////////
var imgss = document.querySelectorAll(".article img");
var blur = document.querySelector("#blur");
////////////////////////////////////////////////////
////////////////////////////////////////////////////
var audiobig = document.querySelector("#footeraudio audio")
var btnrojo3 = document.querySelector("#btnrojo3")
////////////////////////////////////////////////////
////////////////////////////////////////////////////
var btntwakof = document.querySelector("#btntwakof")
var btntakadom = document.querySelector("#btntakadom")
////////////////////////////////////////////////////
////////////////////////////////////////////////////
article.forEach(function (article, index) {
    article.addEventListener("click", function () {
        btntwakof.src = "./img/logos/stop.png"
        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        if (audios[index].paused) {
            for (let i = 0; i < audios.length; i++) {
                audios[i].pause();
            }
            ////////////////////////////////////////////////////
            ////////////////////////////////////////////////////
            if (audios[index]) {
                blur.style.cssText = `background-image: url(${imgss[index].src});`
                audios[index].currentTime = 0;
                audios[index].play();
            }
            ////////////////////////////////////////////////////
            ////////////////////////////////////////////////////
            btntakadom.onclick = function (params) {
                for (let i = 0; i < audios.length; i++) {
                    audios[i].pause();
                }
                if (true) {
                    index = index + 1
                    blur.style.cssText = `background-image: url(${imgss[index].src});`
                    audios[index].currentTime = 0;
                    audios[index].play();
                }
            }
            ////////////////////////////////////////////////////
            ////////////////////////////////////////////////////
            btnrojo3.onclick = function (params) {
                for (let i = 0; i < audios.length; i++) {
                    audios[i].pause();
                }
                if (true) {
                    index = index - 1
                    blur.style.cssText = `background-image: url(${imgss[index].src});`
                    audios[index].currentTime = 0;
                    audios[index].play();
                }
            }
            ////////////////////////////////////////////////////
            ////////////////////////////////////////////////////
            btntwakof.onclick = function (params) {
                if (audios[index].paused) {
                    for (let i = 0; i < audios.length; i++) {
                        audios[i].pause();
                        btntwakof.src = "./img/logos/stop.png"
                    }
                    audios[index].play();
                }
                else {
                    btntwakof.src = "./img/logos/play-button.png"
                    for (let i = 0; i < audios.length; i++) {
                        audios[i].pause();
                    }
                }
            }
            ////////////////////////////////////////////////////
            ////////////////////////////////////////////////////
        } else {
            btntwakof.src = "./img/logos/play-button.png"
            audios[index].pause();
        }
    });
});


////////////////////////////////////////////////////
//MoshafAPI//////////MoshafAPI//////////////////////
////////////////////////////////////////////////////
//MoshafAPI
const apiUrl = 'https://mp3quran.net/api/v3';
const language = 'ar';
////////////////////////////////////////////////////
////////////////////////////////////////////////////
async function getReciters() {
    const chooseReciter = document.getElementById('chooseReciter');
    const res = await fetch(`${apiUrl}/reciters?language=${language}`);
    const data = await res.json();
    chooseReciter.innerHTML = `<option value=""></option>`;
    data.reciters.forEach(reciter => chooseReciter.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`);
    chooseReciter.addEventListener('change', e => getMoshaf(e.target.value));
}
getReciters();
////////////////////////////////////////////////////
////////////////////////////////////////////////////
async function getMoshaf(reciterId) {
    const chooseMoshaf = document.getElementById('chooseMoshaf');
    const res = await fetch(`${apiUrl}/reciters?language=${language}&reciter=${reciterId}`);
    const data = await res.json();
    const moshafs = data.reciters[0].moshaf;
    chooseMoshaf.innerHTML = `<option value=""></option>`;
    moshafs.forEach(moshaf => {
        chooseMoshaf.innerHTML += `<option value="${moshaf.id}" data-server="${moshaf.server}" data-surahlist="${moshaf.surah_list}">${moshaf.name}</option>`;
    });
    chooseMoshaf.addEventListener('change', e => {
        const selectedMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex];
        const surahServer = selectedMoshaf.dataset.server;
        const surahList = selectedMoshaf.dataset.surahlist;
        getSurah(surahServer, surahList);
    });
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
async function getSurah(surahServer, surahList) {
    const chooseSurah = document.getElementById('chooseSurah');
    const res = await fetch(`${apiUrl}/suwar`);
    const data = await res.json();
    const surahNames = data.suwar;
    chooseSurah.innerHTML = `<option value=""></option>`;
    surahList.split(",").forEach(surah => {
        const padSurah = surah.padStart(3, '0');
        surahNames.forEach(surahName => {
            if (surahName.id == padSurah) {
                chooseSurah.innerHTML += `<option value="${surahServer}${padSurah}.mp3">${surahName.name}</option>`;
            }
        });
    });
    chooseSurah.addEventListener('change', async e => {
        const selectedSurah = chooseSurah.options[chooseSurah.selectedIndex];
        playerSurah(selectedSurah.value);
    });
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
function playerSurah(surahMp3) {
    const audioPlayer = document.getElementById('audio');
    audioPlayer.src = surahMp3;
    audioPlayer.play();
    main.remove()
}


////////////////////////////////////////////////////
//KoranForm//////////KoranForm//////////////////////
////////////////////////////////////////////////////
//KoranForm

let moshafe = document.querySelector(".moshafe");
getSurahs();
function getSurahs() {
    fetch("http://api.alquran.cloud/v1/meta")
        .then(response => response.json())
        .then(data => {
            let surahs = data.data.surahs.references;
            let numOfSurahs = 114;
            for (let i = 0; i < numOfSurahs; i++) {
                moshafe.innerHTML += `
                    <div class="suraName">
                        <p class="p">${surahs[i].name}</p>
                        <p>${surahs[i].englishName}</p>
                    </div>
                `
                }
                moshafe.innerHTML += `<div class="foter"></div>`
            let surahtitles = document.querySelectorAll(".suraName");
            let popup = document.querySelector(".popup-moshafe");
            let ayahs = document.querySelector(".ayah");
            surahtitles.forEach((title, index) => {
                title.onclick = function () {
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                        .then(response => response.json())
                        .then(data => {
                            ayahs.innerHTML += ``
                            let ayah = data.data.ayahs;
                            ayah.forEach(aya=> {
                                popup.classList.add("active")
                                ayahs.innerHTML += `<span>${aya.text} <span style="color: rgb(59, 162, 180);"><(${aya.numberInSurah})></span> </span>`
                            });
                        })
                }
            });
            let close = document.querySelector(".close-popup");
                    close.onclick = function () {
                        popup.classList.remove("active")
                        ayahs.innerHTML = ``
                    }
        })
}


////////////////////////////////////////////////////
//Live//////////Live////////////////////////////////
////////////////////////////////////////////////////
//Live
let video = document.getElementById("iframe")
////////////////////////////////////////////////////
////////////////////////////////////////////////////
let Makkah = document.getElementById("Makkah")
Makkahsrc = "https://www.youtube.com/embed/G0PC9JDC-2Y"
Makkah.onclick = function () {
    video.src = Makkahsrc
}
////////////////////////////////////////////////////
////////////////////////////////////////////////////
let Madinah = document.getElementById("Madinah")

Madinahsrc = "https://www.youtube.com/embed/Kt7hKHlArl8"
Madinah.onclick = function () {
    video.src = Madinahsrc
}

////////////////////////////////////////////////////
//salat//////////salat//////////////////////////////
////////////////////////////////////////////////////
//salat
let Fajr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABWtJREFUaEPtWmeoHkUUPQcRLMQC9ppYopIfVoJi7IIiRhDFH7aIYkPUWCIBgyYEFUkMNixRxBIRRBQMon/E2FBjI4Ilxm6MiiJiiYLicU/YJ/v2ze7M7rfv+fHyXfgIvLn3zj1zZ87cuRtiPROuZ3gxADzeMz7I8CDD42wFBlt6nCV0BJxBhgcZHmcrMGZbWtIEAAcA2AnA9gA2APBj/ltF8oOxWNtRBSzpaACnADgKwD4RQB8BeALAEpIrRwv8qACWdAyAuwHs2SJwAXgOwC0kn29hX2vSKeB8294P4LSOAnXGzyb5R0f+unstSdobwNJsS+7RVXC5n/cBTCf5eRd+O8lwDvZlAFvVBOUsfVb4/Q1gRwATsy18cATMDwAOIflpr6B7BizJrPtWdma3rQhmeX4eH68KVpIX6mQAswHsVqH3FYBDSa7uBXQXgF8CcFggiN8BzCTpM50skuZkV9b8CgMz+f4k/0x2WFLsCbCkawDcHJjc9+vxJN9uE5gkb/GnAWwdsF9E8qo2fm3TGrCkjQB8HTi3Pm+Hk3Q2Woskn+/X80Kl7GcayVfbOO8F8PkAFgcmnUryzTbBlG0kTQFgDtikNPYMyRPbzNEYcF49XQzg1MCED5A8r00gNYR2KYDbA+MTSX7ZdK5kwJJcGt4BwFVUlUwi+UXTIGL6ktbk9XdRdT7J62K25fEkwJLOzO7M+wD43FbJsyRPSAkgA3DBOgIhQ0dihAtJvq5uKg28Q/LAlPmKOlHAki7K6+KY7xkkH44pSZoK4JVcz+TjM1orklyclCutfwBskTH2rzH7ZMCS/NJxPVslywC8ltXOfto9SXJt3eSSfM24VBy6bszoU0j63xjoDwG4fC2K6+xHYrZJgCVtA8BXy5YBh58AOJeky8kkkbRhnllnuCjOsDP9V2SxfC9PD+i84R1I8qGUQCq3tKR7AFwYcPIYydNTnBd1JN0LYN3ZDchikqG5/lOVdCuAy2vm9S47NvPzbV1sQcCSnNVvsipq45LxUpIntQA7I3skPBixO6cuS5LmArg+4sOFkEF/XKVXBdj37F0lI5+z3ZuSRIGkvKXrxFu6ksQSAdv/9wAmk/wlNFkVYHccjisZXEvyxibZDZBUzLySxCQdCcC/IXE9MK3C4UKSs5oA9jnYrmTgVVsVi3hovIakYi6SSMxOJO0L4CkAkwJOdyXpJ+Uwqcqw+0rDFcnonV00iJBUDHSUxAoLa7DvAti85HQWyYWpgL3/3VYtygSSv8UizVc+haRirmpJrLS4VwNYUHLo7udZqYDdJp1cUnaBEO0dNyCpGOBaEisB3iuvGYp/XkFyv1TAIdK6jKQfD7WS18k7VCiZdI4ojb2YkZErtpCsSam387d5ubO5luSmqYBDT7KVJMulXQz/sPGKq2VeRg++Y1uLJJ9jNwiLsprkzqmA3W0INcvmkpzXNrJRBHwFgEWluJaR9BePYVJXWj4KIFRCziYZ6mNF12E0AEvy1w13TTcrBTCH5A1NAIeIYMh+CYArU145xQm7BpwTpF9zI7auv2WF+mq1d6ukEN0XMbwHwIzu2tWN9aJ4Sw0jo1TAgaoqtHvc06pqANxGcmbIKFpMZE3yOwFcEt2vIxVGkFEDwCkPhaqQVuRfKYLfo6KA7bWm/1y3Dv8HYDf1/ACp/DqRBDgH7fvTPahyQVIFeqwBv+BOKsmf6rKQDHjIiSSfjTMAHBTZ5mMF2C2jBT13PGJnVtIu/s6Tt0/do/J/YYiRVvmJZ/0QuYX0ir5/zguN5SS/i8VaHG+c4SbO+1F3ALgfs9JlTIMMd7ma/ehrkOF+zEqXMQ0y3OVq9qOvQYb7MStdxrTeZfhfZcvsTF1/SUwAAAAASUVORK5CYII=";
let Shrook = "data:image/png;base64,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"
let Dhuhr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABNhJREFUaEPtmkmoXUUQhr8fQdQ4G2Mcg0NwNoqg0UQNEhHFjcQgCNkI4rASwQFcGMGFiiDuJCKCKLhQEEEIiBpnQZyCCmoSRxJnBV24UMtTvr7J4dxz7+k+p+9795lTm5B3q6vq7+rTXf1Xi91MtJvhpQf8f894n+FJZtjM1gN3VXzcLcn/PisyqxnuAc/ktM/wJNd2v6RjZtfMFgKLJX0Uoz/QyfUNm9lpwHeSfkrx77rJGQ5gXwcWARdI+jjWaQ7AZnYq8BrwA7AyFXQSYDM7DHgZODmA/A1YJenDGNBmtsr1K7qbJG2KHH9m8H9g0P+k+P9FKaCjAQewbwLHVYL7NTXTMeCqOmbmYF8CDqr89mlKplMAHw68ARxbE7CDvljSB23ANI0JYF8B9q/R/QJYIWlHk53kb9jMjg6g/d+q+PI+W9K2GMexOmbmK+o94ICaMd8A50v6NtZedIZLO61n2DPtGS/Ls8BVkv6OdR6jZ2Z7AM8Bl1f0PaOeWc9wtCQDdstmdlKxhF8FDg2eNkq6rMmrma0AlgBHBN3twFeSfALHSjH2BWB1UPId2k+Iz5rGVX9vBTiAPqPYcX139WPpEkl/1jkPk3MbcCUw2F2rqr4HPAPcL+nzEXb2KkC+CJwYToakGmBgszXgANp3zi2S/qgGaWYLgHuAmxOzcF+hv75uAs3Mv+MlkjYn2typ3gnwKKdm5sv2ecCLhDbyPnCFJF/yWSU7YDM7JVRCB3eM9HvgvNRNqclnVsChOHkXOLLJceTv/j2fK8m/8SySG/DTwJoske0ysqEoKq7PZTMbYDNbBkyi0voLOF7S1zlA5wT8JHBNjqBqbDwo6ZYctrMANrM9i+PHS8u9cwRVY2OHpEGx0slFLeBwbx1leOg6Z2aXAhs7RdI8eFn1/B1x3dx15tawoaMA2xj/Q6SbmV1XlIsbmmPupLFWkm+KO2UEoVAGPIQvF+A7Q1XVCVHD4FslPTAtgG8H7p0kWuAOSV52TkWG1xVMyOMTBrxO0hOTAjyu9VG3aa0M5eQkMftF/60K4DqOLH3TSo06XNJ/GUHBpJqr03fbCyWN20yj/GQ5h91TQf88Clwb5TVd6WFJN6YPGx6RE7DfkvxSns1mCPcfYGkurixrcAW78RRwdY5MlGw8VtTR2VZObsCLgXeAozKB3gKcM7XXw/Ate1fCCftR/FXsXDhRt3yqCYABEjNzgs+7BIfEoqvoObXjLZxaQq+lzf+GdVrS4Q68dQSJ5+ziI06nJgboXNhNdfdfM9s33I2jell1flsDNrPTAW9/eENr9RiadnnR2rwh0LR1rRKP6+dA0z4kye0NiZntUxDvzk37J3Nhaqt2YLAV4A5EvGf7mFLXwpfuNklvN62COSPizWxcq2WNJD83s8mctloC3+zN8Lpj53fgLElbs6GdqeBOCM20/WrsfhmWtzfVoiR6SZvZNLdLncr9MQZxCmDv/vsm5btvWaahIe6vAJy4b5RowG4pvO/w9xXePXRx4s6dRfV65tWTh8HUlR61eFHhxcFcPWoZFCdJL3mSMlwC7X3hRSlgwwrJ8tYyPFvaLsnvyUnSCnCSh5JyjmdLbX0PxvWAu87guPF9hmdmp39NO8lVNqvf8CSBxNruAcfO1HzV6zM8XzMXG/e/hDr3TH8cPa0AAAAASUVORK5CYII="
let Asr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABK5JREFUaEPtmmnopWMYxn9XvlgaS1mzzVgGzQdrExm7Ihkl8sFaJCSMZTRlYjQhzZhsIaQwUhJl0vgiEwlja5RljN3YIskyfJDLuev91/m/87znXc57zpz+c+46n957ua7nfpb7uZ8jNjPRZsaXMeGpnvFxhscZnmIjMJ7SUyyhG9EZZ3ic4Sk2AkOb0ranAYcBewC7AVsAv2S/dZI+GsbYDpSw7ROBs4ATgINKCH0CPAssl7R2UOQHQtj2ScCDwP4NgBt4CbhL0ssN7HuatEo4m7aPAue0BDQyfqGkv1vy195tyfaBwIrOlNyvLXCZnw+BuZK+bMNvKxnOyL4G7NgDVGTpi67fv8DuwPTOFD6yhMzPwFGSPu+XdN+Ebceu+05nze5SAGZ1th6fKQJrOwbqTGABsE+B3jfA0ZLW90O6DcKvAsckQPwFzJMUa7qy2F7YObIWFxjETn6opH8qO8wp9kXY9o3AnYngcb6eKundJsBsxxR/AdgpYb9M0vVN/IZNY8K2twS+TazbWG/HSopsNBbbsb7fzAqVvJ85kl5v4rwfwpcCDyeCzpb0dhMweRvbs4DYA7bOfXtR0ulNYtQmnFVPVwBnJwI+JumSJkB6bGhXAfcmvk+X9HXdWJUJ247S8D4gqqgimSHpq7ogyvRtf5/V392qiyXdXGab/16JsO3zO2fmI0Cs2yJZKem0ugCq6NuO4+qOnO57kg6vYt+tU0rY9uVZXVzm+yJJT5QpNfluO4qTfKX1H7B9Z8f+o47PnoRtx00n6tkiWQW80amd42r3nKQNdYLX0bX9MRDla7dEnf1kHT+FhG3vDMTRskPC4WfAxZKinByK2I5zeW4i2FsxAyU9XgVIL8IPAZclnDwt6dwqztvUsX03cE0PnzHLTpb0Q6+4ScK2I6vfdaqorXLGKySd0SaRqr5sLwJuKdGPQihIf1qkV0Q4ztkHckZRQe1bd5OoSqhMryLhcPMTMFPS7ymfRYSj43BKzuAmSbeXARvUd9vHA/GbkKgH5hTEWyppfh3CsQ52zRnEqK0bFKEmfm0fDDwPzEjY7y0prpSTpCjD0VearCiVntlNQPdrYzvIvg9sl/M1X9LSqoRj/kdbtVumSfqzX4CDsLd9A7Ak5zu6nxdUJRxt0pk55VnD6h3XHRTbB2Q1Q7fpGkmHVCWc2rSulhSXh5GT7G6e72xukLRNVcKpK9laSfnSbiTIZ+s4GoTdsl7SnlUJR7ch1SxbJOnWkWDZBcL2tcCyHK5VkuLFY5L0Ki2fAlIl5AJJqT7WJhkH2/G6EV3TbXMAFkq6rQ7h1EYwYb8cuE5SVF+bTGzPzm5zG03deMtK9dXKroep7b6b4AdA7OhRu0ZjfZgSPa2iBsA9kualwJQWE50m+f3AlcNk0mesNdkrRfI9qpRwBO/Rf+4TW+vm0dSLFm7h60Qlwhnp47K2bL4gaR11Q4evRCdV0q+97CsTnnBiO9bGecARDYG1bRavi0v67niUobK9V7zzZO3TeBKJvzAMS37LXiFXS/qxTtDaGa7jfBR1x4RHMSttYhpnuM3RHEVf4wyPYlbaxDTOcJujOYq+xhkexay0iWmzy/D/2tdUTBbxuAQAAAAASUVORK5CYII="
let Maghrib = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABV9JREFUaEPtWmmsXVMU/j7DHw1NxDy2QqsNqYogKDHEGBH8INEiRKJElCIVqVJiiLSpmkXQKD8aSoQK8aORNmgIrbnUEJSYhxjCj89ecl5y3r57n7PPuec0N++dldy8l3v2WWt9e+299rfWvsQoE44yvOgAj/SIdxHuIjzCZqBb0iMsoD1wugh3ER5hM7DJlrSkrQEcCGA3ADsD2BzAD9lnA8l3N8XctgpY0jEAzgRwNIBJJYA+BPAUgKUk7f9WpBXAko4FcB+AfWp4LQAvAlhA8uUa7xe+0ihgSWPckn0IwNkNOfo0gHNI/tWQvuaqJUkTADxXM6pFeN4DcCrJz5oA3UiEM7CrAWxX4JRF6dPsY87/A2BXAHsCOKwEzPcADif5cb+g+wYsyZx+0+3ZHSPOvAHgDpLLYs5K2jZLbte4pLV3ZNxXNjEkv+wHdBOAVwI4KuDEnwCuJnlvFQclzQFwa+Qdy95TSf5dRWd+bF+AJV1l0QsY/xnAiSTX1HFM0kHuzH42O699FYtIXlFHr73TL2DbW/6+/RHANJIf1HXK3pO0E4BXAYwL6DH9q+rorw1Y0nnOmUcDRo8gaQmsb5FkZOV1dyYbS8vLC271nFzHQGXAko4EMDNy1hpLmlHHkYKEdnFGYvwh40l+XtVWMmBJ+wK4C8BxBUYmNHF0+PolfQFgD+/7W0he1wpgSWc5gw8D2KrAwEskTyhyQNL1Lm/c6I25iaR9HxVJlqQWegPWkjygccCSYkvKt3UByUdaAmyJK8S0tiH5exXQhUta0mkAnilQaGfwawDeB7Cc5B9tADadkt4BsJ+n/1ySjzUCOGM/H0Xo4icALiT5ShVjdZd0Bng5gNMD9uysfwDAEymEJBphSfcAuCRgYJk7Y21PV5Y+AS8AcGWBUWNhx5dRzyBgSWMBbAwkqRUkT6mMNHuhT8BzAcwvsW1820BHSU8M8EUAHvSUG4Pai+RvAwzYXLO20USSP4X8jAF+HoDPZOaRLJvhwrnoM8JWoFiraEisfTQtYnChy96zqwD+2kV4F++FyQ3w41rncGwWJU1xmfvJSEk5jqQRlmESi7D1lYYPJJNZWYGDjQI2O5LsjH4bgOWdvMwheXsq4F8CCsam7F9J1rwzstKELHF8+fwyRZIse1sWz8vjJKenArYsZ9w5L/un9I4lben4tpVuB5c5WvL8LQCHOL78b5keSdYdXe+NW0fSlvzwlRpSJmmFK8tO8p7NInlnmfFsmW3vSMLaSAGfosLq7Ckkv0kZnNlM2oaxPXypY1h3e8bWk5xYwYGpWS1rEa8iFlGrqZO7JZKsEeiXihtJWr8tKcI20A5xX+aTnJfqfUGToEjFTJL3p9rIons5gEXeO6tI9hxbRdRyqTXBA4avJXlbqkMVk1hSksrblmRdTuuM+ll6LsmbkyKczZopivWBbTJmk/yuDHiFJJacpIZsSrLLOTuHxwf8mBS6oyorD0OFd173OgBWUdnE/J9N3XF9g2/cFSJlSSyapCTZFgr5aZzeupshWUzSlnmPlJIJVyYuBnBZWSSHnjNCUCTFklhhknKAe7JviS8WhENj91GlgLPlbTcCPawlOIMFjCySxAqTVEXARiWthRu9nUgCnIG2jGcVlE9IhuGORTi37/JMrDRJVQBszYgzSFpVF5VkwDmHZ2XZO7h/EgAPMTH7W8qkEgDb7aLdXS1J2XaVAeeA7579hMFuCHbIfsIQTFqBJGYXb1uQtKqsULKScjNv0K8ANrgSdg3Jb8t05J/XBlzFyCCN7QAPUjTa8KWLcBuzOkg6uwgPUjTa8KWLcBuzOkg6uwgPUjTa8GXURfg/bc3jTIrg02YAAAAASUVORK5CYII="
let Isha = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABF5JREFUaEPtml2oFlUUhp8XAq20LKgwhUCKoqvCIAsVJVRMk8qKoqDwIruqLkIhCUtQRC+86KII8ocglEr6L6iLfimMMCIyNCywoIvUzCLBn9Wsmo8Ox5lv9uzZM+c7eRacq7PXu9/n28OeNWtvcYaFzjBexoD/7ys+tsIpVtjMxgGzgQXAjcAsSSdTaDfVSLrCZnYp8CjwIHB+bm6LpGVNjabKTwJsZpOBDcB9BcYWSno3leGmOo2BzcxXcyNwXoGZU8B4ScebGk2VHw2cr+qLwJw+ZvZIujqV2RQ6UcBmNgN4HbiowsR2SfekMJpKozawmfkG9HyggQ2SVgaO7WRYLWAzWwq8BMEV2hpJqzshCZwkGNjMpgOf+CYUqO3DVkjyDW1gIgjYzCYB3wBTajp/WNLTNXNaHR4K/BZwc4STVZLWReS1llIJbGb3A1sjHQxUleUMfYHN7MKsevoeuCAS+GNJXlMPTFQBrwGeaOD2T2CSpBMNNJKmlgKb2dnAzw1Wt2d0rqQPkrpuINYP+AFgSwPtXuq6rJZelUAniUQ/4PeBmxLMciD74S7LChBLoNVYohDYzHyTOtRY/T+BxZL81TbiUQa8CHgzobv3JM1PqBctVQa8Fng8WrU4cSA2rzLgN4DFiYH3A1eNdDOgDHgvcEViYJd7UtJTLegGS5YB/5G1bc4NVgkf6K2eeZI+DE9JO7IMuM1XyO/ADEl70qKEqZ0GbGbnAF4Sthk/Ab6JeZ3eaYzECvcA/T3v7+fPuiQuAz4KTOjIyJ2SXu5oruLPQzP7DriyIxO+X3hT0NtBh9ues2yF3wYWtj35MP2DgDf8tkpqbQ8pA/bG22MdA/em81eid1g2S9od48HMrgNOSPpqeH4Z8C15oz1mvpQ5P+Y+/MPjB0n7euJm5t1TP7Dr/U0FluS9t4uBmZI+DQV2kd9SOu9Y66ikorOu8p5W1oduo57uivu17HG+tWiyfg2Au4AdXTlMPM8dkl6pC3wW4BXRJYnNtC3nnr3D4ke1p0VV19IPwta37TCx/kpJfjhfGFXA/sXk37G+642G+AWYlp1Y/hUF7Elm9lD2WD8zGmiBpZJ29vNaedSSQ38OXD/g0O9Iqjz/CgX2l/q3wMQBhfaN6lpJv1b5CwLOV9nvXA3MbZwhYMf86ZP0dRWs/z8YOIf2a0kvhAh3NMa/tJZICm4p1wLOoZcDz3YEVDXNcknPVQ0a+v/awDn07XkV5sXJSIQ3A++u2pGLjEUB59B+dclfAX4Lr8vws6rbJH0ZM2k0cA7tZ1B+h+PemMkjcrYBj0g6EpH7T0oj4N6kZjYzB78m1khF3hfZ4Z5fkPF6oFEkAR4CPi+/TVtZAAS6fjX7wN8k6aPA8ZXDkgIPAfdH3S+x+T1Mr9Aur3Ty7wBvzu/K8vzGwE5J3rRPGq0AD3doZt5BuQHwR374xTZv2PkGtEuS97NajU6AWyWoKT4GXPMHG3XDx1Z41C1ZTcN/A+IuJEzWsUdZAAAAAElFTkSuQmCC"



let selectDawla = document.getElementById("selectDawla");
let selectMadina = document.getElementById("selectMadina");
let selectButton = document.querySelector(".selectutton"); // corrected the class name

console.log(selectDawla.value);
    console.log(selectMadina.value);
selectButton.addEventListener("click", function() {
    let prayertime = document.getElementsByClassName("prayer-time")[0];
    prayertime.innerHTML =""
    let t = [ Fajr, Shrook, Dhuhr, Asr, Maghrib, Isha]
    getPrayerTime();
    function getPrayerTime() {
        fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectMadina.value}&country=${selectDawla.value}&method=8`)
        .then(response => response.json())
        .then(data => {
            let times = data.data.timings;
            let prayertime = document.getElementsByClassName("prayer-time")[0]; // Selecting the first element
            let i = 0;
            if (prayertime) {
                for (let time in times) {
                    if (time === "Fajr" || time === "Sunrise" || time === "Dhuhr" || time === "Asr" || time === "Maghrib" || time === "Isha") {
                        prayertime.innerHTML +=
                        `
                        <li class="prayer-time">
                        <div><span><img src="${t[i]}">${time}</span></div>
                        <span>${times[time]}</span>
                        </li>                      
                        `
                        i++
                    }
                }
            }
        })
    }
});

/////////remove()////////////////remove()////////////
///remove()/////////remove()///////////remove()//////
mainLive.remove()
mainkoran.remove()    
/////////remove()////////////////remove()////////////
///remove()/////////remove()///////////remove()//////
