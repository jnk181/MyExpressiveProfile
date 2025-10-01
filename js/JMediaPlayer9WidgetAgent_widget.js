var music_list=[
    {
        src: "./media/music/Lady Gaga - Disease.mp3",
        synced_lyrics:"",
        title: "Disease",
        album: "MAYHEM",
        artist: "Lady Gaga",
        date: "2024-10-25"
    },
    {
        src: "./media/music/Lady Gaga - Abracadabra.mp3",
        synced_lyrics:"",
        title: "Abracadabra",
        album: "MAYHEM",
        artist: "Lady Gaga",
        date: "2024-02-03"
    },
    {
        src: "./media/music/bolg - blbt nin remix.mp3",
        synced_lyrics:"",
        title: "Burn Like Brilliant Trash",
        album: "Machines of Loving Grace",
        artist: "Machines of Loving Grace",
        date: "1991"
    },
    {
        src: "./media/music/Wulfband - Chaostanzen.mp3",
        synced_lyrics:"",
        title: "Chaostanzen",
        album: "Wulfband",
        artist: "Wulfband",
        date: "2014"
    },
    {
        src: "./media/music/Nine Inch Nails - Wish.mp3",
        synced_lyrics:"",
        title: "Wish",
        album: "Broken",
        artist: "Nine Inch Nails",
        date: "1992"
    },
    {
        src: "./media/music/DM - Enjoy The Silence 2004.mp3",
        synced_lyrics:"",
        title: "Enjoy The Silence 2004",
        album: "Remixes",
        artist: "Depeche Mode",
        date: "2004"
    },
    {
        src: "./media/music/KMFDM - Bait & Switch.mp3",
        synced_lyrics:"",
        title: "Bait & Switch",
        album: "BLITZ",
        artist: "KMFDM",
        date: "2009"
    },
    {
        src: "./media/music/Imogen Heap - Daylight Robbery.mp3",
        synced_lyrics:"",
        title: "Daylight Robbery",
        album: "Speak For Yourself",
        artist: "Imogen Heap",
        date: "2005"
    }

]

class JMediaPlayer9WidgetAgent {
    constructor(id) {
        this.playlist=music_list;
        this.player_id = id;
        this.audio_elem=document.querySelector(`#${this.player_id}_controller`);
        this.selected_index=null;
        this.progress_controller=null;
        document.querySelector(`#${this.player_id} .seekbar-mid`).addEventListener('click', (event) => {
            var bbl = document.querySelector(`#${this.player_id} .seekbar-mid`).getBoundingClientRect().left;
            var lth = document.querySelector(`#${this.player_id} .seekbar-mid`).getBoundingClientRect().width;
            var prc = Math.round(((event.x - bbl)/lth)*10000)/100;
            this.setseekbaratperc(prc);

            this.audio_elem.currentTime=this.audio_elem.duration * (prc/100);
        })

        document.querySelector(`#${this.player_id} .seekbar-mid`).addEventListener('touchstart', (event) => {
            var bbl = document.querySelector(`#${this.player_id} .seekbar-mid`).getBoundingClientRect().left;
            var lth = document.querySelector(`#${this.player_id} .seekbar-mid`).getBoundingClientRect().width;
            var prc = Math.round(((event.touches[0].clientX - bbl)/lth)*10000)/100;
            this.setseekbaratperc(prc);

            this.audio_elem.currentTime=this.audio_elem.duration * (prc/100);
        })

        document.querySelector(`#${this.player_id} .button-play`).addEventListener('click', () => {
            this.playpause();
        })

        document.querySelector(`#${this.player_id} .button-prev`).addEventListener('click', () => {
            this.prev();
        })

        document.querySelector(`#${this.player_id} .button-next`).addEventListener('click', () => {
            this.next();
        })

        this.audio_elem.addEventListener('ended', () => {
            this.resetseekbar();
            document.querySelector(`#${this.player_id}`).dataset.playstate="paused";
            if(this.selected_index<this.playlist.length) {
                this.playatindex(parseInt(this.selected_index)+1);
            }
        })

        
        var cnt=0;
        this.playlist.forEach(song => {
            var new_node=document.querySelector(`#${this.player_id} .playlist-list .list-item`).cloneNode(true);
            new_node.classList.remove("template");
            new_node.querySelector(`span`).innerHTML=`${song.title} - ${song.artist}`;
            new_node.dataset.index=cnt;
            cnt++;
            new_node.addEventListener('click', () => {
                this.playatindex(new_node.dataset.index)
            })
            document.querySelector(`#${this.player_id} .playlist-list`).appendChild(new_node);
        })
    }

    set_progresscontroller = () => {
        if(this.progress_controller==null)
        this.progress_controller = setInterval(() => {
            console.log("control")
            var percentage=Math.round((jmp9a.audio_elem.currentTime/jmp9a.audio_elem.duration)*10000)/100;
            this.setseekbaratperc(percentage);
        },350);
    }

    resetseekbar = () => {
        document.querySelector(`#${this.player_id} .progress`).style.width=`0%`;
        document.querySelector(`#${this.player_id} .button-trackslider`).style.left=`0%`;
    }

    setseekbaratperc = (perc) => {
        document.querySelector(`#${this.player_id} .progress`).style.width=`${perc}%`;
        document.querySelector(`#${this.player_id} .button-trackslider`).style.left=`${perc}%`;
    }

    pause_progresscontroller = () => {
        clearInterval(this.progress_controller);
        this.progress_controller=null;
    }

    playpause = () => {
        if(document.querySelector(`#${this.player_id}`).dataset.playstate=="paused") this.play();
        else if(document.querySelector(`#${this.player_id}`).dataset.playstate=="playing") this.pause();
    }

    play = () => {
        if(this.selected_index==null) {this.playatindex(0); return;}
        this.audio_elem.play();
        document.querySelector(`#${this.player_id}`).dataset.playstate="playing";
        this.set_progresscontroller();

        document.querySelector(`#${this.player_id} .text span.title`).innerHTML=this.playlist[this.selected_index].title;
        document.querySelector(`#${this.player_id} .text span.album`).innerHTML=this.playlist[this.selected_index].album;
        document.querySelector(`#${this.player_id} .text span.artist`).innerHTML=this.playlist[this.selected_index].artist;
        document.querySelector(`#${this.player_id} .text span.date`).innerHTML=this.playlist[this.selected_index].date;

        document.querySelector(`#${this.player_id} .song-info img.cover`).src=this.playlist[this.selected_index].src.slice(0,-4)+"_cover.jpg";
        document.querySelector(`#${this.player_id} .song-info img.disc`).src=this.playlist[this.selected_index].src.slice(0,-4)+"_disc.png";
        document.querySelector(':root').style.setProperty('--music-player-bk', "url(\""+this.playlist[this.selected_index].src.slice(0,-4)+"_background.webp\")");
    }

    playatindex = (index) => {
        this.selected_index=parseInt(index);
        this.audio_elem.src=this.playlist[this.selected_index].src;
        this.play();
        document.querySelectorAll(`#${this.player_id} .playlist-list .list-item`).forEach(item => item.classList.remove("selected"));
        document.querySelectorAll(`#${this.player_id} .playlist-list .list-item:not(.template)`)[this.selected_index].classList.add("selected");

        if(parseInt(this.selected_index)==this.playlist.length-1) {
            document.querySelector(`#${this.player_id} .button-next`).disabled=true;
        }
        else {
            document.querySelector(`#${this.player_id} .button-next`).disabled=false;
        }

        if(parseInt(this.selected_index)==0) {
            document.querySelector(`#${this.player_id} .button-prev`).disabled=true;
        } 
        else {
            document.querySelector(`#${this.player_id} .button-prev`).disabled=false;
        }
    }

    pause = () => {
        this.audio_elem.pause();
        document.querySelector(`#${this.player_id}`).dataset.playstate="paused"
        this.pause_progresscontroller();
    }

    next = () => {
        if(this.selected_index<this.playlist.length-1) {
            this.playatindex(parseInt(this.selected_index)+1);
        }
    }

    prev = () => {
        if(this.selected_index>0) {
            this.playatindex(parseInt(this.selected_index)-1);
        }
    }
}