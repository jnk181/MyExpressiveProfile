var jmp9a;

var config={
    name: "jnk181",
    status: "11:59 🌕"
}

var photo_albums=[
    {
        name:"Cats",
        icon:"./img/icons/cat_cookie.png",
        photos:[
            {
                src:"./media/photos/tufny.jpg",
                caption:"Tufnica",
                date:"2025-03-20",
            },
            {
                src:"./media/photos/micky.jpg",
                caption:"Mikica",
                date:"2024-12-13",
            }
        ]
    },
    {
        name:"Nature",
        icon:"./img/icons/tree.png",
        photos:[
            {
                src:"./media/photos/nat1.jpg",
                caption:"",
                date:"2025-03-20",
            },
            {
                src:"./media/photos/nat2.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/nat3.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/nat4.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/nat5.jpg",
                caption:"",
                date:"2024-12-13",
            }
        ]
    },
    {
        name:"Italy",
        icon:"./img/icons/italy.png",
        photos:[
            {
                src:"./media/photos/italy1.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/italy2.jpg",
                caption:"",
                date:"2024-12-13",
            },
            {
                src:"./media/photos/italy3.jpg",
                caption:"",
                date:"2024-12-13",
            }
        ]
    },
    {
        name:"Old photos",
        icon:"./img/icons/history.png",
        photos:[
            {
                src:"./media/photos/old1.jpg",
                caption:"E75",
                date:"2018",
            },
            {
                src:"./media/photos/old2.jpg",
                caption:"Tennis",
                date:"2018",
            },
            {
                src:"./media/photos/old3.jpg",
                caption:"Autokomanda",
                date:"2016",
            },
            {
                src:"./media/photos/old4.jpg",
                caption:"Vojvodina",
                date:"2019",
            }
        ]
    },
]

var notes=[
    {
        title:"Title",
        content:"<h1>Test</h1>",
        date:"2025-10-02",
    }
]

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(`span.profilename`).innerHTML=config.name;
    document.querySelector(`span.profilestatus`).innerHTML=config.status;

    document.querySelectorAll(`button.tabber`).forEach(button => {
        button.addEventListener('click', function() {
            console.log(this.getAttribute('data-tabname'));
            document.querySelectorAll(`.tab-container`).forEach(tabcont => tabcont.style.display="none");

            document.querySelector(`.tab-container.${this.getAttribute('data-tabname')}`).style.display="";

            document.querySelectorAll(`button.tabber`).forEach(btn => btn.disabled = false);
            this.disabled=true;
        });
    })
    jmp9a=new JMediaPlayer9WidgetAgent("mediaplayerwidget");

    photo_albums.forEach(photo_album => {
        var new_node = document.querySelector(`.profile-photos .photos-album.template`).cloneNode(true);
        new_node.querySelector('.header img.icon').src=photo_album.icon;
        new_node.querySelector('.header span.title').innerHTML=photo_album.name;
        photo_album.photos.forEach(photo => {
            var photo_node=document.querySelector(`.profile-photos .photo.template`).cloneNode(true);
            photo_node.querySelector(`img.photo-main`).src=photo.src;
            photo_node.querySelector(`span.caption`).innerHTML=photo.caption;
            photo_node.classList.remove('template');
            new_node.querySelector(`.album-content`).appendChild(photo_node)
        })
        new_node.classList.remove('template');
        document.querySelector(`.profile-photos .inner-content`).appendChild(new_node);
    })

    document.querySelectorAll(`.profile-photos .photos-album .header`).forEach(item => {
        item.addEventListener('click', function() {
            if(!this.parentElement.classList.contains("open")) this.parentElement.classList.add("open");
            else {this.parentElement.classList.remove("open")}
        })
    })

    document.querySelectorAll(`.note-item`).forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector(`.overlay-black`).style.display="";
            document.querySelector(`.overlay-black .note-preview`).style.display="";
        })
    })
});