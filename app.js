        let plist_vl = []
        let pathList = []
        let currentPlay = null
        let currentAudio = new Audio()
        let audio_volume = 1
        let audio_minvolume = .5
        
        const ctr_wrapper = document.querySelector(".ctr-wrapper")
        const fl_wrapper = document.querySelector(".fl-wrapper")

        const media = document.querySelector(".media")

        const sd_pg = document.querySelector(".sd-pg")
        const sd_btn = document.querySelector(".sd-btn")
        const sd_view = document.querySelector(".sd-view")
        const sd_search = document.querySelector(".sd-search")
        const sd_wrapper = document.querySelector(".sd-wrapper")
        const sd_option = document.querySelector(".sd-option")
        const sd_opt_trig = document.querySelector(".sd-opt-trig")

        const curr_icon = document.querySelector(".curr-icon")
        const curr_player = document.querySelector(".curr-pause")
        const title = document.querySelector(".title")
        const range = document.querySelector(".range")

        const playlist_icon = document.querySelector(".playlist-icon")
        const playlist_holder = document.querySelector(".playlist-holder")
        
        let plist_option = ["default","random","reverse"]
        let plist_bhv = {
            "type" : "default"
        }
        let plist_idle_option = ["none","default","random","reverse"]
        let plist_idle = {
            "type" : "none"
        }

        const plist_bhv_label = document.querySelector(".plist-bhv-label")
        const plist_bhv_prev = document.querySelector(".plist-bhv-prev")
        const plist_bhv_next = document.querySelector(".plist-bhv-next")
        
        const plist_idle_label = document.querySelector(".plist-idle-label")
        const plist_idle_prev = document.querySelector(".plist-idle-prev")
        const plist_idle_next = document.querySelector(".plist-idle-next")

        let bhv_range = 0
        function switch_bhv(option) {
            plist_bhv.type = option.toString()
            plist_bhv_label.textContent = `mode : ${option}`
            if(plist_option.indexOf(option) != bhv_range) {
                bhv_range = plist_option.indexOf(option)
            }
        }
        function switch_bhv_prev() {
            if(bhv_range > 0){
                bhv_range -= 1
                switch_bhv(plist_option[bhv_range])
            }
        }
        function switch_bhv_next() {
            if(bhv_range < plist_option.length - 1){
                bhv_range += 1
                switch_bhv(plist_option[bhv_range])
            }
        }
        
        let idle_range = 0
        function switch_idle(option) {
            plist_idle.type = option.toString()
            plist_idle_label.textContent = `idle : ${option}`
            if(plist_idle_option.indexOf(option) != idle_range) {
                idle_range = plist_idle_option.indexOf(option)
            }
        }
        function switch_idle_prev() {
            if(idle_range > 0){
                idle_range -= 1
                switch_idle(plist_idle_option[idle_range])
            }
        }
        function switch_idle_next() {
            if(idle_range < plist_idle_option.length - 1){
                idle_range += 1
                switch_idle(plist_idle_option[idle_range])
            }
        }

        plist_bhv_prev.addEventListener("click",switch_bhv_prev)
        plist_bhv_next.addEventListener("click",switch_bhv_next)

        plist_idle_prev.addEventListener("click",switch_idle_prev)
        plist_idle_next.addEventListener("click",switch_idle_next)
        
        

        async function plist_promise() {
            try {
                const rd_sync = random_int(0,plist_vl.length)
                
                if(currentAudio.ended && plist_bhv.type == plist_option[0] && plist_vl[0] != undefined){
                    for(data of pathList){
                        for(let k = 0; k < data[1].length; ++k){
                            if(`${data[0]}/${data[1][k]}` == `${data[0]}/${plist_vl[0]}`){
                                    // preload_auto()
                                    sd_wrapper.children[0].children[0].preload = "auto"

                                    initialize_list(plist_vl[0],data[0])
                                    await audio_play()
                                    display_title()
                                    await display_icon(plist_vl[0],data[0])
                                    display_media()
                                    shift_playlist()
                                    console.log("plist promise end")

                                    return
                            }
                        }
                    }
                }
                if(currentAudio.ended && plist_bhv.type == plist_option[1] && plist_vl[rd_sync] != undefined){
                    for(data of pathList){
                        for(let k = 0; k < data[1].length; ++k){
                            if(`${data[0]}/${data[1][k]}` == `${data[0]}/${plist_vl[rd_sync]}`){
                                // preload_auto()
                                sd_wrapper.children[rd_sync].children[0].preload = "auto"

                                initialize_list(plist_vl[rd_sync],data[0])
                                await audio_play()
                                display_title()
                                await display_icon(plist_vl[rd_sync],data[0])
                                display_media()
                                splice_playlist(rd_sync)
                                console.log("plist_random promise end")

                                return
                            }
                        }
                    }
                }
            } catch (err){

            }
            try {
                const rd_sync = random_int(0,pathList.length)
                
                if(currentAudio.ended && plist_idle.type == plist_idle_option[1] && plist_vl.length == 0) {
                    for(data of pathList){
                        for(let k = 0; k < data[1].length; ++k){
                            //copy this code : currentAudio.currentSrc.split("/").slice(0,currentAudio.currentSrc.split("/").length - 1).join("/")

                            // console.log(currentAudio.currentSrc.split("/")[currentAudio.currentSrc.split("/").length - 2],currentAudio.currentSrc.split("/").slice(0,currentAudio.currentSrc.split("/").length - 1).join("/"))

                            console.log("time's repeated")
                        
                            if(`${data[0]}/${data[1][k]}` == `${data[0]}/${currentPlay}` && currentAudio.currentSrc.split("/")[currentAudio.currentSrc.split("/").length - 2] == data[0] && data.length != k){

                                initialize_list(data[1][k + 1],data[0])
                                await audio_play()
                                display_title()
                                await display_icon(data[1][k + 1],data[0])
                                display_media()

                                return
                            } 
                            else if(`${data[0]}/${data[1][k]}` == `${data[0]}/${currentPlay}` && currentAudio.currentSrc.split("/").slice(0,currentAudio.currentSrc.split("/").length - 1).join("/") == data[0] && data.length != k){

                                initialize_list(data[1][k + 1],data[0])
                                await audio_play()
                                display_title()
                                await display_icon(data[1][k + 1],data[0])
                                display_media()

                                return
                            }
                            
                            // else if(`${data[0]}/${data[1][k]}` == `${data[0]}/${currentPlay}` && data.length == k) {

                            //     initialize_list(pathList[rd_sync][1][random_int(0,pathList[rd_sync][1].length)],pathList[rd_sync][0])
                            //     await audio_play()
                            //     display_title()
                            //     await display_icon(pathList[rd_sync][1][random_int(0,pathList[rd_sync][1].length)],pathList[rd_sync][0])
                            //     display_media()

                            //     return
                            // }
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        setInterval(() => {
            plist_promise()
        }, 1000)
        
        function add_ctr_lists(lists,path = "") {
            pathList.push([path,lists])

            const ctr_lists = document.createElement("div")
            ctr_lists.setAttribute("class","ctr-lists")

            const body = document.body
            for(bchild of body.children){
                if(bchild.getAttribute("class") == "ctr-wrapper"){
                    lists.forEach((list,i) => {

                        const ctr_list = document.createElement("div")
                        ctr_list.setAttribute("class","ctr-list")
            
                        const ctr_vlist = document.createElement("video")
                        ctr_vlist.setAttribute("class","ctr-vlist")
                        ctr_vlist.setAttribute("poster","Character-CrimsonAbyss-Portrait.webp")
                        ctr_vlist.currentTime = 10
                        ctr_vlist.volume = .6
                        // ctr_vlist.src = `${path}/${list}`
                        // ctr_vlist.preload = "auto"
                        // ctr_vlist.muted = true
            
                        const plist_add = document.createElement("div")
                        plist_add.setAttribute("class","plist-add")
                        plist_add.textContent = "+"
                        if(innerWidth <= 400){
                            plist_add.style.transform = ""
                        }
            
                        ctr_list.appendChild(ctr_vlist)
                        ctr_list.appendChild(plist_add)
                        //find ctr-lists 
                        ctr_lists.appendChild(ctr_list)
                        bchild.appendChild(ctr_lists)
                        
                        ctr_vlist.addEventListener("click",() => {
                            ctrPlay(list,path)
                        })
                        plist_add.addEventListener("click",() => {
                            add_playlist(list,path)
                        })  
                        function ctr_pointerover() {
                            if(innerWidth <= 400){
                                volume_(audio_minvolume)

                                ctr_vlist.play()
                            }
                            else {
                                volume_(audio_minvolume)

                                ctr_list.style.boxShadow = "4px 4px 4px rgb(180, 184, 227), -4px -4px 4px rgb(180, 184, 227),4px -4px 4px rgb(180, 184, 227),-4px 4px 4px rgb(180, 184, 227)"
                                ctr_list.style.transform = "scale(1.2)"

                                ctr_vlist.play()
                            }
                        }
                        function ctr_pointerleave() {
                            if(innerWidth <= 400){
                                volume_(audio_volume)

                                ctr_vlist.pause()
                                ctr_vlist.currentTime = 10
                            }
                            else {
                                volume_(audio_volume)

                                ctr_list.style.boxShadow = ""
                                ctr_list.style.transform = ""
                                
                                ctr_vlist.pause()
                                ctr_vlist.currentTime = 10
                            }
                        }
                        function ctr_screen_out() {
                            ctr_list.style.boxShadow = ""
                            ctr_list.style.transform = ""
                            
                            // ctr_vlist.pause()
                            ctr_vlist.currentTime = 10
                        }
                        ctr_list.addEventListener("pointerover",() => {
                            ctr_pointerover()
                        })
                        ctr_list.addEventListener("pointerleave",() => {
                            ctr_pointerleave()
                        })
                        const ctr_list_observer = new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                entry.target.classList.toggle("manifest-ctr-list",entry.isIntersecting)
                            })
                        })
                        ctr_list_observer.observe(ctr_list)

                        const ctr_vlist_observer = new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if(!entry.isIntersecting){
                                    entry.target.preload = "none"
                                }
                                else {
                                    entry.target.preload = "auto"
                                    ctr_screen_out()
                                }
                                entry.target.src = `${path}/${list}`
                            })
                        })
                        ctr_vlist_observer.observe(ctr_vlist)
                    })
                }
                if(bchild.getAttribute("class") == "fl-wrapper"){
                    lists.forEach((list,i) => {
                        const fl_list = document.createElement("div")
                        fl_list.setAttribute("class","fl-list")

                        const fl_icon_ctr = document.createElement("div")
                        fl_icon_ctr.setAttribute("class","fl-icon-ctr")

                        const fl_option = document.createElement("div")
                        fl_option.setAttribute("class","fl-option")
                        fl_option.textContent = "|>"

                        //media here
                        const fl_icon = document.createElement("video")
                        fl_icon.setAttribute("class","fl-icon")
                        fl_icon.setAttribute("poster","./Character-CrimsonAbyss-Portrait.webp")
                        fl_icon.currentTime = 10

                        const fl_title = document.createElement("div")
                        fl_title.setAttribute("class","fl-title")
                        fl_title.textContent = `${list}`

                        fl_icon_ctr.appendChild(fl_icon)
                        fl_list.appendChild(fl_icon_ctr)
                        fl_list.appendChild(fl_title)
                        fl_list.appendChild(fl_option)

                        bchild.appendChild(fl_list)

                        fl_option.addEventListener("click",() => {
                            ctrPlay(list,path)
                        })
                        fl_icon_ctr.addEventListener("click",() => {
                            add_playlist(list,path)
                        })

                        function fl_screen_out() {
                            fl_icon.currentTime = 10
                        }

                        const fl_ilist_observer = new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if(!entry.isIntersecting){
                                    entry.target.preload = "none"
                                }
                                else {
                                    entry.target.preload = "auto"
                                    fl_screen_out()
                                }
                                entry.target.src = `${path}/${list}`
                            })
                        })
                        fl_ilist_observer.observe(fl_icon)
                    })
                }
            }
        }
        function add_ctr_h(path){
            const ctr_h = document.createElement("div")
            ctr_h.setAttribute("class","ctr-h")
            ctr_h.textContent = path

            const body = document.body
            for(bchild of body.children){
                if(bchild.getAttribute("class") == "ctr-wrapper"){
                    bchild.appendChild(ctr_h)
                }
            }
        }
        function add_filler() {
            const filler = document.createElement("div")
            filler.setAttribute("class","filler")

            const body = document.body
            for(bchild of body.children){
                if(bchild.getAttribute("class") == "ctr-wrapper"){
                    bchild.appendChild(filler)
                }
            }
        }
        function add_banner(file_path,obj_pos_x,obj_pos_y) {
            const banner = document.createElement("div")
            banner.setAttribute("class","banner")

            const banner_list = document.createElement("img")
            banner_list.setAttribute("class","banner-list")
            banner_list.src = file_path.toString()
            if((parseFloat(obj_pos_x) && parseFloat(obj_pos_y))){
                const multiplier = 100
                banner_list.style.objectPosition = `${parseFloat(obj_pos_x * multiplier)}% ${parseFloat(obj_pos_y * multiplier)}% `
            }
            
            banner.appendChild(banner_list)

            const body = document.body
            for(bchild of body.children){
                if(bchild.getAttribute("class") == "ctr-wrapper"){
                    bchild.appendChild(banner)
                }
            }
        }
        function ctr_template_scroller(lists,path,caption) {
            if(!caption) caption = path
            add_ctr_h(caption)
            add_ctr_lists(lists,path)
        }

        function add_playlist(list,path) {
            plist_vl.push(list)

            const plist = document.createElement("div")
            plist.setAttribute("class","playlist")
            const plist_ilist = document.createElement("video")
            plist_ilist.setAttribute("class","playlist-icon")
            plist_ilist.setAttribute("poster","Character-CrimsonAbyss-Portrait.webp")
            plist_ilist.currentTime = 10
            // plist_ilist.src = `${path}/${list}`
            const plist_holder = document.createElement("div")
            plist_holder.setAttribute("class","playlist-holder")
            const plist_title = document.createElement("div")
            plist_title.setAttribute("class","playlist-title")
            plist_title.textContent = list
            plist.appendChild(plist_ilist)
            plist.appendChild(plist_holder)
            plist_holder.appendChild(plist_title)
            sd_wrapper.appendChild(plist)

            function playlist_screen_out() {
                plist_ilist.currentTime = 10
            }
            //bug 
            const plist_ilist_observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(!entry.isIntersecting){
                        entry.target.preload = "none"
                    }
                    else if(entry.isIntersecting) {
                        entry.target.preload = "auto"
                        playlist_screen_out()
                    }
                    entry.target.src = `${path}/${list}`
                })
            })
            plist_ilist_observer.observe(plist_ilist)
        }
        function shift_playlist() {
            plist_vl.shift()
            sd_wrapper.children[0].remove()
        }
        function splice_playlist(sp_plist) {
            plist_vl.splice(sp_plist,1)
            sd_wrapper.children[sp_plist].remove()
        }

        function ctrPlay(list,path) {
            if(list == currentPlay && !currentAudio.paused) return
            else if(list == currentPlay && currentAudio.paused){
                audio_play()
            }
            else {
                initialize_list(list,path)
                audio_status()
                display_title()
                display_icon(list,path)
                display_media()
            }
        }

        function goAt(sec){
            currentAudio.currentTime = sec
            media.currentTime = sec
        }

        function initialize_list(list,path) {
            currentPlay = list
            currentAudio.src = `${path}/${list}`
            media.src = `${path}/${list}`
        }

        //audio_controller
        function audio_play() {
            return new Promise((resolved,rejected) => {
                try {
                    if(sd_wrapper.children[0].children[0].readyState > 1){
                        curr_player.textContent = "| |"
                        currentAudio.play()
                        media.play()
                        console.log("audio done")
                        resolved()
                    }
                    else {
                        curr_player.textContent = "| |"
                        currentAudio.play()
                        media.play()
                        console.log("audio done")
                        resolved()
                    }
                } catch(err){
                        curr_player.textContent = "| |"
                        currentAudio.play()
                        media.play()
                        console.log("audio done")
                        resolved()
                }
            })
        }
        function audio_pause() {
            curr_player.textContent = ">"
            currentAudio.pause()
            media.pause()
        }
        //audio_status
        function audio_status() {
            if(currentPlay == undefined || null) return
            if(currentAudio.paused){
                audio_play()
            } else {
                audio_pause()
            }
        }

        //display
        function display_title(file_name){
            title.textContent = currentPlay
        }
        function display_icon(icon,path){
            return new Promise((resolved,rejected) => {
                try {
                    if(sd_wrapper.children[0].children[0].readyState > 1){
                        curr_icon.src = `${path}/${icon}`
                        curr_icon.play()
                        curr_icon.muted = true
                        setTimeout(() => {
                            curr_icon.currentTime = 10
                            curr_icon.pause()
                            console.log("icon done")
                            resolved()
                        }, 200)
                    }
                    else {
                        curr_icon.src = `${path}/${icon}`
                        curr_icon.play()
                        curr_icon.muted = true
                        setTimeout(() => {
                            curr_icon.currentTime = 10
                            curr_icon.pause()
                            console.log("icon done")
                            resolved()
                        }, 200)
                    }
                } catch (err){
                    curr_icon.src = `${path}/${icon}`
                    curr_icon.play()
                    curr_icon.muted = true
                    setTimeout(() => {
                        curr_icon.currentTime = 10
                        curr_icon.pause()
                        console.log("icon done")
                        resolved()
                    }, 200);
                }
            })
        }
        function display_media(list) {
            media.muted = true
        }
        function thumb_status() {
            
        }
        //etc
        function random_int(min,max) {
            return Math.floor(Math.random() * (max - min)) + min
        }
        let sd_sw = true
        function sd_switch() {
            if(sd_sw){
                // sd_pg.style.right = 0
                sd_sw = false
                sd_btn.textContent = "X"
                sd_btn.style.animation = "sd-btn .5s"
                sd_pg.style.animation = "sd_out .5s forwards"
                sd_view.style.display = "flex"
                sd_opt_trig.style.display = "flex"
            }
            else {
                // sd_pg.style.right = "clamp(-100vw,-40vw,-300px)"
                sd_sw = true
                sd_btn.textContent = "☰"
                sd_btn.style.animation = "sd-btn .5s"
                sd_pg.style.animation = "sd_in .5s forwards"
                sd_view.style.display = "none"
                sd_opt_trig.style.display = "none"
            }
        }
        let view_md = true
        function view_mode() {
            if(view_md){
                ctr_wrapper.style.display = "none"
                fl_wrapper.style.display = "block"
                view_md = false
            }
            else {
                ctr_wrapper.style.display = "block"
                fl_wrapper.style.display = "none"
                view_md = true
            }
        }
        let view_opt = true
        function view_option() {
            if(view_opt){
                sd_wrapper.style.display = "none"
                sd_option.style.display = "block"
                view_opt = false
            }
            else {
                sd_wrapper.style.display = "block"
                sd_option.style.display = "none"
                view_opt = true
            }
        }
        function volume_(amnt = 1) {
            currentAudio.volume = amnt
        }


        // range.addEventListener("timeupdate",thumb_status)
        curr_player.addEventListener("click",audio_status)
        sd_btn.addEventListener("click",sd_switch)
        sd_view.addEventListener("click",view_mode)
        sd_opt_trig.addEventListener("click",view_option)

        sd_switch()
        view_option()

        //still optional
        sd_search.addEventListener("keyup",(e) => {
            const vlist = document.querySelectorAll(".ctr-vlist")
            const fl_icon = document.querySelectorAll(".fl-icon")
            for(i of vlist){
                curr_src = i.currentSrc
                try {
                    if(decodeURI(curr_src.split("/")[curr_src.split("/").length - 1]).trim().toLowerCase().includes(e.target.value.trim().toLowerCase())){
                        i.parentElement.style.display = "flex"
                    }
                    else {
                        i.parentElement.style.display = "none"
                    }
                } catch(err){
                    if(curr_src.split("/")[curr_src.split("/").length - 1].trim().toLowerCase().includes(e.target.value.trim().toLowerCase())){
                        i.parentElement.style.display = "flex"
                    }
                    else {
                        i.parentElement.style.display = "none"
                    }
                }
            }
            for(i of fl_icon){
                curr_src = i.currentSrc
                try {
                    if(decodeURI(curr_src.split("/")[curr_src.split("/").length - 1]).trim().toLowerCase().includes(e.target.value.trim().toLowerCase())){
                        i.parentElement.parentElement.style.display = "flex"
                    }
                    else {
                        i.parentElement.parentElement.style.display = "none"
                    }
                } catch(err){
                    if(curr_src.split("/")[curr_src.split("/").length - 1].trim().toLowerCase().includes(e.target.value.trim().toLowerCase())){
                        i.parentElement.parentElement.style.display = "flex"
                    }
                    else {
                        i.parentElement.parentElement.style.display = "none"
                    }
                }
            }
        })
        function ripple_effect(e) {
            const ripple = document.createElement("span")
            ripple.setAttribute("class","ripple-effect")
            ripple.style.top = `${e.clientY}px`
            ripple.style.left = `${e.clientX}px`
            ripple.style.background = `rgba(${random_int(0,255)},${random_int(0,255)},${random_int(0,255)},.1)`
            ripple.style.animation = "ripple-effect 1s ease"

            const body = document.body
            body.appendChild(ripple)
            setTimeout(() => {
                ripple.remove()
            }, 1000);
        }
        window.addEventListener("click",(e) => {
            ripple_effect(e)
        })
        window.addEventListener("keyup",(e) => {
            if(e.keyCode == "32"){
                audio_status()
            }
            if(e.keyCode == "37"){
                goAt(currentAudio.currentTime - 10)
            }
            if(e.keyCode == "39"){
                goAt(currentAudio.currentTime + 10)
            }
            if(e.keyCode == "73") {
                sd_switch()
            }
        })

        add_banner("./banner/628286.webp",".5",".7")
        add_filler()
        ctr_template_scroller([
            "f(x) - 4 Walls (Zekk Remix).mp4",
"greyl - Trendy.mp4",
"kamome sano - Lovesick (feat ぷにぷに電機).mp4",
"OYASUMI in my dream (Original Mix).mp4",
"PSYQUI & Houou Karin - Shining Lights  Speed Garage.mp4",
"Moe Shop - Baby Pink (w YUCe).mp4",
"Nightcore - No Friends (Lyrics).mp4",
"PSYQUI - Are You Kidding Me (ft Mami)  Jpop Future Core.mp4",
"PSYQUI - Fly to the moon feat 中村さんそ.mp4",
"PSYQUI - Hype feat Such.mp4",
"PSYQUI - dont you want me ft Such.mp4",
"PSYQUI - Secret Dance Hall (ft SUCH)  J-pop 2019.mp4",
"PSYQUI - Multitalents.mp4",
"PSYQUI - OYASUMI in my dream.mp4",
"PSYQUI - Still in my heart feat ぷにぷに電機  Lyrics [CC].mp4",
"PSYQUI - ヒステリックナイトガール (Awakening) (ft SUCH)  J-Pop.mp4",
"PSYQUI feat Marpril - Girly Cupid.mp4",
"PSYQUI - Your Voice So Zekk Full Spec Remix (Ft SUCH)  Future Core.mp4",
"Still in my heart (feat ぷにぷに電機).mp4",
"Signal (feat Such).mp4",
"Rejection - Signal (ft SUCH)  Future Core 2020.mp4",
"Your voice so (feat such).mp4",
"Ujico  Snails House - Pixel Dream.mp4",
"Zakku x Nakanojojo - Matcha Love (feat アリガトユイナ).mp4",
"[Blue Archive] Theme 109.mp4",
"[Future Garage] f(x) - 4 Walls (Zekk Remix).mp4",
"PSYQUI - ヒステリックナイトガール feat Such (android52 Edit).mp4",
"「Footwork」[PSYQUI] Too Late.mp4"
        ],"MaidCat")
        ctr_template_scroller(["Bad Computer & Danyka Nadeau - Chasing Clouds.mp4",
        "Just Love (feat PSYQUI).mp4",
        "Kunaru & Kachi - One More Time.mp4",
        "masara - Tegami (ft yutsuki & Hikaru Station).mp4",
        "PSYQUI & Houou Karin - Shining Lights  Speed Garage.mp4",
        "PSYQUI - Beautiful Future.mp4",
        "PSYQUI - Education.mp4",
        "Zekk - City Lights (Remix).mp4",
        ],"Nyahn")

        ctr_template_scroller([
            "Android52 - Wrapped Up Remix.mp3",
"Ashidoran - 明日の夢 (feat 初音ミク).mp3",
"Bad Computer & Danyka Nadeau - Chasing Clouds.mp3",
"banvox - Watch Me (Audio) [Google Android TV Commercial Music].mp3",
"Author wind - Closer to you.mp3",
"banvox - Summer [Official Music Video].mp3",
"Brandon Liew - DREAMERS (feat TOFIE).mp3",
"Citrus OP「Azalea」By nanoRIPE Lyrics.mp3",
"DoctorNoSense - Safe to Say (Official Audio).mp3",
"Broken Light (feat mami).mp3",
"Day by Day (feat Nicole Curry).mp3",
"f(x) - 4 Walls (Zekk Remix).mp3",
"dooks & nabil! - AH!.mp3",
"Endless (feat Mameyudoufu).mp3",
"Friend.mp3",
"Future Cider.mp3",
"Geoxor - Kill Aura.mp3",
"Future Cαke.mp3",
"Future Cαndy.mp3",
"greyl - Trendy.mp3",
"Hiromi - One Love Feat Simon.mp3",
"HoneyComeBear - See You - またね.mp3",
"HoneyComeBear - Dear.mp3",
"HoneyComeBear - Sneaker.mp3",
"greyl - MYC.mp3",
"icesawder - Stardom.mp3",
"HoneyComeBear - レイニーガール (Official Audio).mp3",
"kamome sano - Lovesick (feat ぷにぷに電機).mp3",
"Kamaboko - Colorful.mp3",
"Just Love (feat PSYQUI).mp3",
"KOTONOHOUSE - PRESS START!.mp3",
"Kunaru & MG5902 - Hurt You.mp3",
"Kunaru & Kachi - One More Time.mp3",
"Kuro - Aiming For That Sky Where The Meteor Shower Flows  From【ハピコア流星群】.mp3",
"Madeon - All My Friends (Kagi Remix).mp3",
"KOTONOHOUSE - Pitter  Patter (ftTOFUKU).mp3",
"Mameyudoufu - Midnight Grow (ft Mami)  Jpop Future Core.mp3",
"masara - Tegami (ft yutsuki & Hikaru Station).mp3",
"Miruku - Bend It Over.mp3",
"lapix - Day by day (PSYQUI Remix).mp3",
"Moe Shop - GHOST FOOD (feat TORIENA).mp3",
"Malt & Aiyru - Cosmos.mp3",
"Moe Shop - Baby Pink (w YUCe).mp3",
"Moe Shop - Notice (w TORIENA).mp3",
"Moe Shop - WWW (feat EDOGA-SULLIVAN).mp3",
"Moe Shop - WONDER POP.mp3",
"Moe Shop - You Look So Good [Pure Pure EP].mp3",
"nanoRIPE  アザレア - Music Video.mp3",
"Nightcore - No Friends (Lyrics).mp3",
"OYASUMI in my dream (Original Mix).mp3",
"POISON.mp3",
"Moe Shop - Want You.mp3",
"PSYQUI & Houou Karin - Shining Lights  Speed Garage.mp3",
"PSYQUI - Chatroom  Jpop Future Core.mp3",
"PSYQUI - Are You Kidding Me (ft Mami)  Jpop Future Core.mp3",
"Psyqui - Deep Blue.mp3",
"PSYQUI - Beautiful Future.mp3",
"PSYQUI - DJ Noriken - スターゲイザ (ft YUCe)  PSYQUI Remix.mp3",
"PSYQUI - dont you want me ft Such.mp3",
"PSYQUI - Dont You Want Me (ft SUCH)  Jpop Kawaii Future Bass 2019.mp3",
"PSYQUI - Education  Future Core 2019.mp3",
"PSYQUI - Dont You Want Me (ft Such) Mameyudoufu Remix.mp3",
"PSYQUI - Endless (Mameyudoufu Remix).mp3",
"PSYQUI - Fly To The Moon (ft 中村さんそ)  J-Pop.mp3",
"PSYQUI - Funk Assembly  J-Pop Funk.mp3",
"PSYQUI - Fly to the moon feat 中村さんそ.mp3",
"PSYQUI - Hype (ft SUCH)  Jpop Kawaii J-Core 2019.mp3",
"PSYQUI - Hype (Lapix Remix) ft Such  Jcore Future Core.mp3",
"PSYQUI - Love & Roll (ft SUCH) Speed Garage J-Pop.mp3",
"PSYQUI - Mend Your Ways (ft SUCH)  Jpop Kawaii Future Bass 2019.mp3",
"PSYQUI - Hype feat Such.mp3",
"PSYQUI - Nervousness.mp3",
"PSYQUI - Multitalents.mp3",
"PSYQUI - No One  Future Core.mp3",
"PSYQUI - OYASUMI in my dream.mp3",
"PSYQUI - Pallet feat mikanzil.mp3",
"PSYQUI - Rainbow Dream (ft Mo∀)  Future Core.mp3",
"PSYQUI - Raise Your Hands (ft Such)  Future Core.mp3",
"PSYQUI - Secret Dance Hall (ft SUCH)  J-pop 2019.mp3",
"PSYQUI - Up n Up  Future Core.mp3",
"PSYQUI - Education.mp3",
"PSYQUI - Your voice So M-Project Remix.mp3",
"PSYQUI - Vital Error (Beat)  Future Core 2019.mp3",
"PSYQUI - Your Voice So Zekk Full Spec Remix (Ft SUCH)  Future Core.mp3",
"PSYQUI - センチメンタルハートボーイ(ft Such)  J-Pop Future Core.mp3",
"PSYQUI - ヒカリの方へ (ft SUCH) Awakening  Future Core.mp3",
"PSYQUI - No One.mp3",
"PSYQUI - ヒカリの方へ - Lapix & Cranky Remix (ft Such)  Future Core.mp3",
"PSYQUI - ヒステリックナイトガール feat Such (android52 Edit).mp3",
"PSYQUI - ヒステリックナイトガール (Awakening) (ft SUCH)  J-Pop.mp3",
"PSYQUI featSuch - C & B.mp3",
"PSYQUI - 就寝御礼 (Singed By Psyqui Himself!)  J-Pop.mp3",
"PSYQUI feat Marpril - Girly Cupid.mp3",
"PSYQUI - ヒカリの方へ (ft SUCH)  Jpop.mp3",
"Purukichi - Mysterious feat pinana.mp3",
"Purukichi - LOOP  (Feat セトナツメ).mp3",
"Ruxxi - I Mean I Love You VIP (w Malcha).mp3",
"Signal (feat Such).mp3",
"PSYQUI ft Such - LOVE&ROLL.mp3",
"Snails House × Moe Shop - Pastel.mp3",
"SPY x FAMILY - Ending Full「Comedy」by Gen Hoshino (LyricsSubtitles).mp3",
"SpaceJellyfish - クラゲ.mp3",
"Still in my heart (feat ぷにぷに電機).mp3",
"tekalu - Letter feat おんた.mp3",
"Ujico  Snails House - Pixel Dream.mp3",
"Your voice so (feat such).mp3",
"WISE - I Loved You Feat Hiroko.mp3",
"Your Voice So (M-Project Remix).mp3",
"YUCe - Night Club Junkie.mp3",
"YUCe x Snails House - Cosmic Air Ride.mp3",
"YUCe 「Cappuccino」.mp3",
"YUCe 「macaron moon」.mp3",
"YUCe 「Sunset Tea Cup」.mp3",
"Sakumellia.mp3",
"Yunomi (ft Happy Kuru Kuru) – はんぶんこ花火 (Jotori Remix).mp3",
"Zakku x Nakanojojo - Matcha Love (feat アリガトユイナ).mp3",
"Yuarkin - Drive High.mp3",
"Yunomi - Wakusei Rabbit (ft TORIENA).mp3",
"[Future Garage] f(x) - 4 Walls (Zekk Remix).mp3",
"Zekk - City Lights (Remix).mp3",
"「Footwork」[PSYQUI] Too Late.mp3",
"「Future Core」[PRout] Tasogare.mp3",
"「Future Core」[PSYQUI feat Such] ヒカリの方へ (Awakening).mp3",
"【Electronic】Voia - Almost Human (GonZealous Remix).mp3",
"【Citrus 柑橘味香氣】nanoRIPE _「アザレア」OP.mp3",
"【歌ってみた】春を告げる -  yama南條夢路（cover）.mp3",
"[Blue Archive] Theme 109.mp3",
"うさこ  kotu - Blue Spring Groove [Anime Groove].mp3",
"ぴ！pi - SkyHigh VIP.mp3",
"まさらPmasara - Love10 (ft Juunana & Ran).mp3",
"ヒカリの方へ (lapix & Cranky Remix) (feat Such).mp3",
"ヒカリの方へ (Original Mix).mp3",
"アイシテゲーモーバー.mp3",
"夢さんぽ.mp3",
"合言葉 (feat picco).mp3",
"帰り道.mp3",
"べに／可不.mp3",
"龍族幻想Dragon Raja OST - Music From My Room (10min).mp3",
"高尾大毅 - Dont be afraid.mp3"
        ],"https://rcph-smz.github.io/rcph_player_src/KawaiiNeko","KawaiiNeko")

//         ctr_template_scroller([
//             "Bad Computer & Danyka Nadeau - Chasing Clouds.mp3",
// "Day by Day (feat Nicole Curry).mp3",
// "DoctorNoSense - Safe to Say (Official Audio).mp3",
// "kamome sano - Lovesick (feat ぷにぷに電機).mp3",
// "Just Love (feat PSYQUI).mp3",
// "Kunaru & Kachi - One More Time.mp3",
// "lapix - Day by day (PSYQUI Remix).mp3",
// "masara - Tegami (ft yutsuki & Hikaru Station).mp3",
// "Moe Shop - Baby Pink (w YUCe).mp3",
// "Kunaru & MG5902 - Hurt You.mp3",
// "Moe Shop - Notice (w TORIENA).mp3",
// "Nightcore - No Friends (Lyrics).mp3",
// "Moonstar88 - Migraine (Japanese Version)  kena & miyuki.mp3",
// "PSYQUI & Houou Karin - Shining Lights  Speed Garage.mp3",
// "PSYQUI - Are You Kidding Me (ft Mami)  Jpop Future Core.mp3",
// "PSYQUI - Beautiful Future.mp3",
// "f(x) - 4 Walls (Zekk Remix).mp3",
// "PSYQUI - Chatroom  Jpop Future Core.mp3",
// "PSYQUI - DJ Noriken - スターゲイザ (ft YUCe)  PSYQUI Remix.mp3",
// "PSYQUI - Dont You Want Me (ft SUCH)  Jpop Kawaii Future Bass 2019.mp3",
// "Psyqui - Deep Blue.mp3",
// "PSYQUI - dont you want me ft Such.mp3",
// "PSYQUI - Dont You Want Me (ft Such) Mameyudoufu Remix.mp3",
// "PSYQUI - Education.mp3",
// "PSYQUI - Education  Future Core 2019.mp3",
// "PSYQUI - Fly to the moon feat 中村さんそ.mp3",
// "PSYQUI - Fly To The Moon (ft 中村さんそ)  J-Pop.mp3",
// "PSYQUI - Hype (Lapix Remix) ft Such  Jcore Future Core.mp3",
// "PSYQUI - Funk Assembly  J-Pop Funk.mp3",
// "PSYQUI - Hype (ft SUCH)  Jpop Kawaii J-Core 2019.mp3",
// "PSYQUI - Multitalents.mp3",
// "PSYQUI - Love & Roll (ft SUCH) Speed Garage J-Pop.mp3",
// "PSYQUI - Mend Your Ways (ft SUCH)  Jpop Kawaii Future Bass 2019.mp3",
// "PSYQUI - OYASUMI in my dream.mp3",
// "PSYQUI - Rainbow Dream (ft Mo∀)  Future Core.mp3",
// "PSYQUI - No One  Future Core.mp3",
// "PSYQUI - Raise Your Hands (ft Such)  Future Core.mp3",
// "PSYQUI - Secret Dance Hall (ft SUCH)  J-pop 2019.mp3",
// "PSYQUI - Vital Error (Beat)  Future Core 2019.mp3",
// "PSYQUI - Hype feat Such.mp3",
// "PSYQUI - Your Voice So Zekk Full Spec Remix (Ft SUCH)  Future Core.mp3",
// "PSYQUI - ヒカリの方へ (ft SUCH)  Jpop.mp3",
// "PSYQUI - Your voice So M-Project Remix.mp3",
// "PSYQUI - センチメンタルハートボーイ(ft Such)  J-Pop Future Core.mp3",
// "PSYQUI - ヒカリの方へ - Lapix & Cranky Remix (ft Such)  Future Core.mp3",
// "PSYQUI - ヒステリックナイトガール (Awakening) (ft SUCH)  J-Pop.mp3",
// "PSYQUI - ヒステリックナイトガール feat Such (android52 Edit).mp3",
// "PSYQUI - 就寝御礼 (Singed By Psyqui Himself!)  J-Pop.mp3",
// "PSYQUI - ヒカリの方へ (ft SUCH) Awakening  Future Core.mp3",
// "PSYQUI feat Marpril - Girly Cupid.mp3",
// "Purukichi - LOOP  (Feat セトナツメ).mp3",
// "Purukichi - Mysterious feat pinana.mp3",
// "SPY x FAMILY - Ending Full「Comedy」by Gen Hoshino (LyricsSubtitles).mp3",
// "Signal (feat Such).mp3",
// "PSYQUI - Up n Up  Future Core.mp3",
// "Still in my heart (feat ぷにぷに電機).mp3",
// "Your voice so (feat such).mp3",
// "tekalu - Letter feat おんた.mp3",
// "YUCe x Snails House - Cosmic Air Ride.mp3",
// "Zakku x Nakanojojo - Matcha Love (feat アリガトユイナ).mp3",
// "[Blue Archive] Theme 109.mp3",
// "Zekk - City Lights (Remix).mp3",
// "「Footwork」[PSYQUI] Too Late.mp3",
// "「Future Core」[PSYQUI feat Such] ヒカリの方へ (Awakening).mp3",
// "高尾大毅 - Dont be afraid.mp3",
// "べに／可不.mp3",
// "PSYQUI ft Such - LOVE&ROLL.mp3"
//             ],"https://rcph-smz.github.io/smz/mp3","Main_Page")
        
//         ctr_template_scroller([
// "1_Hour_Most_Popular_Songs_by_PSYQUI_(NON-STOP_Collection_Vol._1_+_BONUS_TRACK)(720p).mp4",
// "1_Hour_PSYQUI_Vol._2(480p).mp4",
// "1st_Single_【_REDHEART_】(1080p)(1).mp4",
// "Amatsuka_Uto_Stream_Intro(1080p).mp4",
// "Android_52_-_The_New_Shrimp_Groove(720p).mp4",
// "Anime_Moan_Remix__Remastered(720p).mp4",
// "Auburn_-_All_About_Him_(slowed_+_reverb)(720p).mp4",
// "aori_-_ぱられループ_を歌ってみた_(Jeku_Remix)(1080p).mp4",
// "ayiko_-_Teichopsia_(ft._Shoko)(1080p).mp4",
// "Azla_-_Flash(1080p).mp4",
// "ayiko_-_Teichopsia_(ft._Shoko)(720p).mp4",
// "Beethoven_-_Für_Elise_(Klutch_Dubstep_Trap_Remix)(720p).mp4",
// "BEST_NIGHTCORE_✘_MASHUP_J-POP(1080p).mp4",
// "BB_Yukus_-_Northern_Sky(1080p).mp4",
// "Brandon_Liew_-_DREAMERS_(feat._TOFIE)(1080p).mp4",
// "Brain_Power(1080p).mp4",
// "Brandon_Liew_-_DREAMERS_(feat._TOFIE)(720p).mp4",
// "Anime Live Wallpaper_3720.mp4",
// "Chiisana_Koi_no_Uta(1080p).mp4",
// "Christmas_Song_-_N.A.M.E(1080p).mp4",
// "Cloudier_-_A_Centimetre_Apart_(Systile_Remix)(1080p).mp4",
// "Cold_Youth_-_Nearby(480p).mp4",
// "Chiisana_Koi_no_Uta(720p).mp4",
// "Colate_-_Dot_to_Dot(1080p).mp4",
// "Colate_-_Good_Night_(Feat._Nanahira)_(Nor_Remix)(1080p).mp4",
// "damper_&_Devious_-_soda_street(1080p).mp4",
// "Crazed_Bucket_-_Still_Lovely(1080p).mp4",
// "Dankel_Rose_-_Blueberry's_Dreamy_Eyes(1080p).mp4",
// "Couple_N_-_Sweet_Garden(1080p).mp4",
// "DJ_Noriken_-_Stargazer_Feat._YUC'e_「_Xignality_Remix_」(1080p).mp4",
// "DJ_Noriken_-_Stargazer_Feat._YUC'e_「_Xignality_Remix_」(360p).mp4",
// "dark_cat_-_BUBBLE_TEA_(feat._juu_&_cinders)(720p).mp4",
// "DJ_Noriken_-_スターゲイザ_(Stargazer)ー_feat._YUC'e_(PSYQUI_Remix)(1080p).mp4",
// "DoctorNoSense_-_Safe_to_Say(720p).mp4",
// "DoctorNoSense_-_Love_Me_Now(720p).mp4",
// "DoctorNoSense_-_Safe_to_Say_(Official_Audio)(1080p).mp4",
// "eleline△_-_Koto_no_Town(1080p).mp4",
// "dark_cat_-_CRAZY_MILK(720p).mp4",
// "DoctorNoSense_-_Safe_to_Say(1080p).mp4",
// "Eli_Noir_–_Wonder_Why_(prod._Noden)_(Lyrics)_[CC](1080p).mp4",
// "excuse.mp4",
// "Elliot_Hsu_-_夢のかたち_(feat._Yuca)(360p).mp4",
// "Ferst_-_Sparkle_(feat._Nobelz)(1080p).mp4",
// "Future_Cαke(720p).mp4",
// "Future_Cαndy(1080p).mp4",
// "EmoCosine_-_Step_to_Sky(480p).mp4",
// "glance_-_Epic_Score__w__nabil%21___noguchii_(480p).mp4",
// "fuwuvi_-_Hyper_Neko(1080p)(1).mp4",
// "Ghostrifter_Official_-_Soaring(1080p).mp4",
// "Gotoubun_no_Hanayome_Opening_-_Gotoubun_no_Kimochi_Full_Version_(Color_Coded)_+_Lyrics(1080p)(1).mp4",
// "greyl_-_MYC(720p).mp4",
// "greyl_-_MYC(720p)(1).mp4",
// "glance_-_Epic_Score__w__nabil%21___noguchii_(720p).mp4",
// "Hardwell_ft._Jake_Reese_-_Run_Wild_(HANAEL_Remix)(720p).mp4",
// "Hanatan_→「_Yuuhi_Saka_」(1080p).mp4",
// "Hatsune_Miku_-_OVER(720p).mp4",
// "Hikanira_&_Mayuru_-_Baka!(1080p).mp4",
// "HoneyComeBear_-_Natsuzora(ナツゾラ)(20XX_Remix)(1080p).mp4",
// "HoneyComeBear_-_Natsuzora_(ナツゾラ)(1080p)(1).mp4",
// "Hazy_Skyscraper(1080p).mp4",
// "hyleo_-_Trigger_(feat._Such)(720p).mp4",
// "Hyp3rsleep_&_SoLush_-_Lovestruck(1080p).mp4",
// "HoneyComeBear_-_Natsuzora_(20XX_Remix)(1080p).mp4",
// "Japanese_Acoustic_Song_•_Zen_Zen_Zense_-_(Cover_by._粉ミルク)__Lyrics_Video(1080p).mp4",
// "Jotori_-_サイキ_(Saiki)(720p).mp4",
// "Hyp3rsleep_–_First_light(1080p).mp4",
// "Jotori_-_Summer_Rain(1080p).mp4",
// "Kamaboko_-_Colorful(720p)(1).mp4",
// "Kanaria_-_KING_covered_by_amatsukauto_໒꒱·_ﾟ(1080p).mp4",
// "Kamaboko_-_Colorful(720p).mp4",
// "Kana_Hanazawa_-_Renai_Circulation_(Lone_Alpha_Remix)(1080p).mp4",
// "Kano_→「_Sentimental_Love_Heart_」(1080p).mp4",
// "Kawaii_Future_Bass_♫_Kawaii_EDM_♫_Kawaii_Music_Mix___Vol.01(720p).mp4",
// "Kenneyon_&_NY~ON!_-_Espresso(1080p)(1).mp4",
// "Kano_-_Dreamin_Chuchu_♡♡♡(1080p)(1).mp4",
// "Kenneyon_-_Boba(1080p)(1).mp4",
// "Kenneyon_-_Citrus(1080p).mp4",
// "Kenneyon_-_Boba(1080p).mp4",
// "Kenneyon_-_Taiko(1080p).mp4",
// "Kirara_Magic_-_Chaos_Nya(720p).mp4",
// "kiino_-_lucky(720p).mp4",
// "Kagi_-_Daydream(1080p).mp4",
// "NETNEGATIVE_-_Sugar_Rush_(_AkoMusic_Release_)(1080p).mp4",
// "MojiX!_x_Elkuu_-_Minamo(720p).mp4",
// "Nightcore_-_4℃_「_CHIHIRO_」(1080p).mp4",
// "Nightcore_-_Aishiteru_「_Wotamin_」(1080p).mp4",
// "Nightcore_-_Asayake_Kimi_No_Uta「Kano」(1080p).mp4",
// "Nightcore_-_BRAVE_「_8utterfly_Feat._CLIFF_EDGE_」(1080p).mp4",
// "Nightcore_-_Butter_Sugar_Cream_「_Tomggg_Feat._Tsvaci_」(1080p).mp4",
// "Nightcore_-_Daisy_Blue_「_Kano_」(1080p).mp4",
// "Nightcore_-_Baby_I_Love_You__「_TEE_」(1080p).mp4",
// "Nightcore_-_Dakedo,_Kimi_Shika_Mienakute..._「_8utterfly_Feat._Zawachin_」(1080p).mp4",
// "Nightcore_-_Daisy_Blue_「_Kano_」(720p).mp4",
// "Mtell_-_Paimon(1080p).mp4",
// "Nightcore_-_Ghost_「_Kano_」(1080p).mp4",
// "Nightcore_-_Girl's_Talk_「_CHIHIRO_」(360p)(1).mp4",
// "Nightcore_-_Demons_(Switching_Vocals)_-_(Lyrics)(1080p).mp4",
// "Nightcore_-_Hello!_How_are_you__Lyrics(1080p).mp4",
// "Nightcore_-_Girl's_Talk_「_CHIHIRO_」(1080p).mp4",
// "Nightcore_-_Ice_Cream_(Switching_Vocals)_-_(Lyrics)(1080p).mp4",
// "Nightcore_-_In_My_Mind_(Remix)_-_(Lyrics)(1080p).mp4",
// "Nightcore_-_Ima_wo_Kakeru_Shoujo_「_Kano_」(1080p)(1).mp4",
// "Nightcore_-_Itsumo_Soba_de_「_KG_Feat._Maiko_Nakamura_」(720p).mp4",
// "Nightcore_-_Kuroneko_「_Akagami_」(360p).mp4",
// "Nightcore_-_Lonely_「_CHIHIRO_」(1080p)(1).mp4",
// "Nightcore_-_Hello,_How_Are_You_「_Kano_」(720p).mp4",
// "Nightcore_-_LOVE_SONG%E3%80%8C_Yuka_Masaki____%E7%9C%9F%E5%B4%8E%E3%82%86%E3%81%8B_%E3%80%8D(1080p).mp4",
// "Nightcore_-_Miss_U「_CHIHIRO_feat._ZANE_(three_NATION)_」(1080p).mp4",
// "Nightcore_-_Mata_Futari_koi_o_Suru「Wotamin」(1080p).mp4",
// "Nightcore_-_Love_Letter_~Eien_no_Shiawase~_「_jyA-Me_」(1080p).mp4",
// "Nightcore_-_Nemurenai_Hodo_「_Yuka_Masaki_Feat._WISE__」(1080p)(1).mp4",
// "Nightcore_-_Nemurenai_Hodo_「_Yuka_Masaki_Feat._WISE__」(1080p).mp4",
// "Nightcore_-_Niwaka_Ame_「_Hanatan_」(1080p).mp4",
// "Nightcore_-_Motto_Aishitakatta_「Yuka_Masaki」(1080p).mp4",
// "Nightcore_-_Nothing_To_Say_~会いたいなんて言えない_I_Love_You~_「_8utterfly_」(1080p).mp4",
// "Nightcore_-_Once_More_Again_~_Mou_Ichido_Dakishimete「_May_J_Feat._LGYankees_」(1080p).mp4",
// "Nightcore_-_No_Friends_(Lyrics)(1080p).mp4",
// "Nightcore_-_Nitamono_Doushi_「_Hiromi_」(1080p).mp4",
// "Nightcore_-_Please_Dont_Say_You_Love_Me_-_(Lyrics)(1080p).mp4",
// "Nightcore_-_Pura_Pura_Lupa_(English_Version)_-_(Lyrics)(1080p).mp4",
// "Nightcore_-_RESET_「_CHIHIRO_」(1080p).mp4",
// "Nightcore_-_Precious_「_Yuna_Ito_」(1080p)(1).mp4",
// "Nightcore_-_Sad_Song_(Switching_Vocals)_-_(Lyrics)(1080p).mp4",
// "Nightcore_-_Sasabune_「_YuRiCa_」(1080p).mp4",
// "Nightcore_-_Sakura_no_Zenya_「_Kano_」(720p).mp4",
// "Nightcore_-_Sayonara_Aishiteta「Saki_Kayama」(360p).mp4",
// "Nightcore_-_Sayonara_My_Love「_Maiko_Nakamura_Feat._NERDHEAD_」(720p).mp4",
// "Nightcore_-_Sayonara_Kono_Natsu_Ni_「_Shota_Shimizu_」(1080p).mp4",
// "Nightcore_-_Setsunakute_「_Da-iCE_」(720p).mp4",
// "Nightcore_-_Secret_Summer_「_NERDHEAD_Feat._Chihiro_」(1080p).mp4",
// "Nightcore_-_Souzou_Forest_「_Kano_」(1080p).mp4",
// "Nightcore_-_Shinpakusuu_♯0822_「_Akie_」(1080p).mp4",
// "Nightcore_-_____Ichibyou_Demo_SORA_x_Se(1080p).mp4",
// "Nikoi0227_-_Wake_Up(1080p).mp4",
// "Nightcore_–_Miss_You_More_(Lyrics)(1080p).mp4",
// "Omoshiroebi_-_Mille_Feuille_(Orig._Stepic)(1080p).mp4",
// "Omoshiroebi_-_Sakura_Saku_Remix_(orig._Yunomi)(720p).mp4",
// "Nikoi0227_-_Sweetie_cocoa(1080p).mp4",
// "Owl_City_-_Fireflies_(dark_cat_remix)(1080p).mp4",
// "Oceanus_-_Keep_A_Secret(1080p).mp4",
// "Owl_City_-_Fireflies_(Official_Video)(480p).mp4",
// "PIKASONIC_-_Friendship!_(Diona,_Qiqi_&_Klee)(1080p).mp4",
// "PIKASONIC_-_Klee!(1080p).mp4",
// "PIKASONIC_-_Emptiness(1080p).mp4",
// "owarin_-_late_for_school!(1080p).mp4",
// "PIKASONIC_-_Pets!_♡_Qiqi_&_Klee_Version(1080p).mp4",
// "PLEEG_-_Peace(720p).mp4",
// "PIKASONIC_-_Nation(1080p).mp4",
// "Polykeeper_-_Restart_Chronicle_(feat._Hatsune_Miku)(720p).mp4",
// "Polykeeper_-_Unconventional_(feat._Hatsune_Miku)(1080p).mp4",
// "POI!!_Ohhh~(1080p).mp4",
// "Pixel_Galaxy(1080p).mp4",
// "the_peggies「センチメートル」Music_Video(1080p).mp4",
// "t+pazolite_-_Chrome_VOX_(Uncut_Edition)(720p).mp4",
// "Sylrica_-_Sweetie(720p).mp4",
// "Teikyou_-_Deadly_Slot_Game(720p).mp4",
// "Tomggg_(Cover._@Taiyoudayo___)_-_Butter_Sugar_Cream(720p).mp4",
// "Tomggg_(Cover._@Taiyoudayo___)_-_Butter_Sugar_Cream(480p).mp4",
// "Tsukachi_-_Together_Is_Better(720p).mp4",
// "Ugumugu_-_Usagi_Ni_Datte_Randoseru(1080p).mp4",
// "Viuk,_Setka_&_Love_Club_-_Tea_Groove_♪(720p).mp4",
// "Varien_hai.mp3",
// "Ultrasonic_exported_0.mp4",
// "Wave_Meow_&_Zentra_-_Cloud_Surfing(1080p).mp4",
// "YOASOBI_-_もう少しだけ_(DoctorNoSense_Remix)(720p).mp4",
// "Xomu_&_Justin_Klyvis_-_Setsuna_(Kirara_Magic_Remix)(1080p).mp4",
// "Your_voice_so..._(Zekk's_'FULL_SPEC'_Remix)_(feat._Such)(720p).mp4",
// "YUC'e_x_Snail's_House_-_Cosmic_Air_Ride(720p).mp4",
// "Xomu_-_Walpurgis_Night(720p).mp4",
// "YUC_e_-_Future_Candy__Kaivaan_Remix_(720p).mp4",
// "Yunomi_&_nicamoq_-_インドア系ならトラックメイカー_(ミカヅキBIGWAVE_Remix)(1080p).mp4",
// "YOASOBI「夜に駆ける」_Official_Music_Video(720p).mp4",
// "Yunomi_&_nicamoq_–_インドア系ならトラックメイカー(720p).mp4",
// "Yunomi_-_Aimai_Trip_(feat._桃箱_&_miko)(1080p).mp4",
// "Yunomi_-_Shugorei_(守護霊)_feat._nicamoq_(Tecchi_Remix)(1080p).mp4",
// "Yunomi_-_ジェリーフィッシュ_(feat._ローラーガール)(1080p).mp4",
// "Yunomi_-_守護霊_(feat._nicamoq)(720p).mp4",
// "YUMMI_-_Starfall_(MoeTunes_Release)(1080p).mp4",
// "Yunomi_-_Yumeiro_Parade_(Feat._Momobako_&_Miko)(720p).mp4",
// "Yunomi_–_ゆのみっくにお茶して_(feat.nicamoq)_(Hibiki_Remix)(1080p).mp4",
// "[16]_Kirara_Magic_♡_10_Kawaii_Japanese_Songs_♡_Anime_Moe!~__Kawaii_Music_Mix♫(720p).mp4",
// "[Blue_Archive]_Theme_109(720p).mp4",
// "Zakku_x_Nakanojojo_-_Matcha_Love_(feat._アリガトユイナ)(1080p).mp4",
// "[15]_Nya!_Arigato_♡_10_Most_Kawaii_Songs_♡_Anime_Moe!~__Kawaii_Music_Mix♫(480p).mp4",
// "[MV]_wannabe-_DEMONDICE(720p).mp4",
// "[MV]_Gang_Gang,_Kawaii!!_(DEMONDICE)_-_American_Saikoro_XFD(720p).mp4",
// "[ORIGINAL]_REFLECT_-_Gawr_Gura(1080p).mp4",
// "[ORIGINAL_SONG]__失礼しますが、RIP♡__“Excuse_My_Rudeness,_But_Could_You_Please_RIP”_-_Calliope_Mori(1080p).mp4",
// "一首好聽的日語歌《彼女は旅に出る》冰鎮豆沙君【中日歌詞Lyrics】(1080p).mp4",
// "ヨルシカ_-_ただ君に晴れ_(MUSIC_VIDEO)(720p).mp4",
// "インドア系ならトラックメイカー_covered_by_Uto_＆_Nabi(1080p).mp4",
// "米津玄師__MV「Lemon」(1080p).mp4",
// "💳💸_sakehands_-_PLASTIC_ft._Good_Intent_中英文歌詞_Lyrics(720p).mp4",
// "不登校のあなたへ(1080p).mp4",
// "🌸_Cloudier_-_A_Centimetre_Apart_[_Sylrica_Remix_]_🎧(720p).mp4"

//         ],"D:/nyahn_collection/nyeow","nyeowwwww")