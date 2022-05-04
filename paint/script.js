var dict = {"noir":"black","gris":"grey","marron":"rgb(75, 49, 0)","rouge":"red","orange":"orange","jaune":"yellow","vert":"green","cyan":"cyan","bleu":"blue","blanc":"white","rose":"pink","vert2":"greenyellow","bleu2":"lightskyblue","violet":"blueviolet"}
perso=0
peindre=false
cercle=false
cos_cercle=[]
droite=false
cos_droite=[]
triangle=false
cos_triangle=[]
rectangle=false
cos_rectangle=[]
peinture=false
cos_peinture=[]

couleur="black"

/////////////////////////////////////////////////////////Fonction de dessin principales/////////////////////////////////////////////////////////

function nouveau(){ //fonction qui affiche un nouveau tableau 
    nb_ligne = document.getElementById("hauteur").value
    nb_colonne = document.getElementById("largeur").value // on récupère les valeurs des formulaires pour ligne et colonnes
    taille = document.getElementById("pixel").value

    var tbl=document.getElementById("dessin")                   
    while(tbl.firstChild){                                // tant qu'il n'est pas vide on efface ces enfants
        tbl.removeChild(tbl.firstChild)         
    }

    var tbl=document.getElementById("dessin");
        for (let ligne=0;ligne<nb_ligne; ligne++){
            var row= document.createElement("tr")        // on crée les lignes du nouveau tableau

            for (let colonne=0; colonne<nb_colonne; colonne++){
                var cell = document.createElement("td");        // on crée les colonnes du nouveau tableau
                var cellText = document.createTextNode("")

                cell.setAttribute("onclick","change_case(["+colonne+","+ligne+"]);");   // on leur donne l'élement onclick`
                cell.setAttribute("onmouseover","change_case_over(["+colonne+","+ligne+"]);")
                cell.id=colonne+"."+ligne;    // on leur donne leur id
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tbl.appendChild(row)
        }

    if (taille=="max"){
            largeur=document.documentElement.scrollWidth //on récupère les valeurs de taille de la fenêtre
            hauteur=document.documentElement.scrollHeight
    
            ratio_h=Math.round((hauteur*0.55)/nb_ligne)-2 // on fait un ratio entre taille et nombre de ligne/colonne à mettre 
            ratio_l=Math.round((largeur*0.9)/nb_colonne)-2 // et on enlève 45% en hauteur car on a beoin de place pour les couleurs et boutton
                                                                // et 10% en largeur pour pas que ce soit coller ça fait pas beau
            
            if (ratio_h>ratio_l){                        // et évidemment on prend le plus petit des deux pour pas que le plus grand pose
                taille=ratio_l                           // problème à l'autre
            }else{
                taille=ratio_h
            }
        }

    for (let ligne=0;ligne<nb_ligne;ligne++){
        for (let colonne=0;colonne<nb_colonne;colonne++){
            temp = document.getElementById(colonne+"."+ligne);
            temp.style.backgroundColor = "white" ;             //on rempli tout le tableau de blanc

            if (nb_colonne<50 && nb_ligne<50){ //si y'a trop de colonne et ligne c'est pas beau les bordures
                temp.style.border="2px black solid"           //on change les border
            }
            taille=parseInt(taille)
            temp.style.width=taille +"px"
            temp.style.height = taille +"px"
        }
    }
}



function change(choix){ //tableau qui change la couleur souhaité

    if (choix=="nouv"){
        perso++ // on indente à chaque fois d'une unité pour les reconnaitre

        couleur_hex=document.getElementById("couleur_perso").value

        dict[perso]=couleur_hex     //on ajoute la nouvelle couleur au dico

        var nav=document.getElementById("choix_perso") 
        var a= document.createElement("a") // on crée le nouveau boutton relative à la couleur

        a.setAttribute("class","couleur");      // on lui donne ses atributs
        a.setAttribute("onclick","change('"+perso+"')");
        a.setAttribute("id","perso"+perso);
        nav.appendChild(a) // on push tout dans le html

        temp = document.getElementById("perso"+perso);  // on défini son background 
        temp.style.backgroundColor=couleur_hex

    }
    couleur=dict[choix]  // on associe la var couleur à sa couleur en anglais , rgb ou hex
}


function change_case(num){ //fonction qui change la case en la couleur voulu
    x=num[0]
    y=num[1]
    if (cercle){ // si le mode cercle est voulu
        cos_cercle.push([x,y])
        temp = document.getElementById(x+"."+y); 
        temp.style.backgroundColor="rgb(183, 193, 172)"
        if (cos_cercle.length>1){ //si on as déja les 2 points qui ont était selectionner on appel la fonction
            trace_cercle()}
    
    }else if(droite){// si le mode droite est voulu
        cos_droite.push([x,y])
        temp = document.getElementById(x+"."+y); 
        temp.style.backgroundColor="rgb(183, 193, 172)"
        if (cos_droite.length>1){
            trace_droite()}

    }else if(rectangle){// si le mode rectangle est voulu
        cos_rectangle.push([x,y])
        temp = document.getElementById(x+"."+y); 
        temp.style.backgroundColor="rgb(183, 193, 172)"
        if (cos_rectangle.length>1){
            trace_rectangle()}

    }else if(triangle){// si le mode triangle est voulu
        cos_triangle.push([x,y])
        temp = document.getElementById(x+"."+y); 
        temp.style.backgroundColor="rgb(183, 193, 172)"
        if (cos_triangle.length>2){
            trace_triangle()}//différament des autres ici on as besoin de 3 points aulieu de deux
    }else if(peinture){
        cos_peinture=[x,y]
        trace_peinture()
    }else{
    temp = document.getElementById(x+"."+y); 
    temp.style.backgroundColor=couleur // on change le fond de la case sélectionné selon la couleur voulu
    }
}

function destruction_tuto(){//fonction qui permet que quand vous cliquer sur "tuto" il se supprime pour pas prendre de la place pour rien
    var tbl=document.getElementById("tuto")                   
    while(tbl.firstChild){                                // tant qu'il n'est pas vide on efface ces enfants
        tbl.removeChild(tbl.firstChild)         
    }
}






/////////////////////////////////////////////////////////Fonction pour pouvoir slider pour dessiner/////////////////////////////////////////////////////////

function change_case_over(num){ //function qui change la case si le mode "peindre" est activé
    x=num[0]
    y=num[1]
    temp = document.getElementById(x+"."+y); 
    if (peindre){
        temp.style.backgroundColor=couleur
    }
}


document.addEventListener("keyup",event =>{ //fonction qui enregistre les touches des claviers
    if (event.key==="p") {
        peindre=!peindre;
    }
});







/////////////////////////////////////////////////////////Fonction de dessin pour les cercles, droite etc/////////////////////////////////////////////////////////

function acti_cercle(){//function qui active le mode cercle
    cercle=true
    droite=false  //on évite que deux modes soit activés en même temps
    rectangle=false
    triangle=false
    peinture=false
}

function acti_droite(){//function qui active le mode droite
    droite=true
    cercle=false
    rectangle=false
    triangle=false
    peinture=false
}

function acti_rectangle(){//function qui active le mode rectangle
    droite=false
    cercle=false
    rectangle=true
    triangle=false
    peinture=false
}

function acti_triangle(){//function qui active le mode triangle
    droite=false
    cercle=false
    rectangle=false
    triangle=true
    peinture=false
}

function acti_peinture(){//function qui active le mode peinture
    droite=false
    cercle=false
    rectangle=false
    triangle=false
    peinture=true
}

function trace_cercle(){ //fonction qui trace le cercle 
    dx=Math.abs(cos_cercle[0][0]-cos_cercle[1][0])
    dy=Math.abs(cos_cercle[0][1]-cos_cercle[1][1])
    rayon=Math.sqrt(dx**2+dy**2)+1 //on fait un coup de pythagore pour connaitre le rayon et +1 car sinon ça prend la limite du pixel donc le pixel selectionner n'est pas colorier

    for (let x=0;x<nb_ligne;x++){
        for (let y=0;y<nb_colonne;y++){
            if (Math.sqrt((x-cos_cercle[0][0])**2+(y-cos_cercle[0][1])**2)<rayon){
                temp = document.getElementById(x+"."+y);
                temp.style.backgroundColor=couleur
            }
        }
    }

    cercle=false
    cos_cercle=[]
}




function trace_droite(){ //fonction qui trace la droite
    dx=cos_droite[0][0]-cos_droite[1][0]  //delta x 
    dy=cos_droite[0][1]-cos_droite[1][1]  //delta y



    min_x=1
    if(cos_droite[1][0]>cos_droite[0][0]){  //on determine le point le + à "gauche", dans mon repère celui ayant le x le plus petit
        min_x=0 
    }
    min_y=1
    
    x=cos_droite[min_x][0]
    y=cos_droite[min_x][1]

    coef=dy/dx
    if (dx==0){
        for (let i=0; i<Math.abs(dy)+1;i++){
            pas=i
            if (dy>0){
                pas=-i
            }
            temp = document.getElementById(Math.round(x)+"."+Math.round(y-pas));
            temp.style.backgroundColor=couleur
        }
    }

    fini=false
    while (!fini){ //tant qu'on à pas fini on indente 
        temp = document.getElementById(Math.round(x)+"."+Math.round(y));
        temp.style.backgroundColor=couleur
        x=x+0.1 //on indente de 0.1 aulieu de 1 pour avoir + de précision sinon il y peu y avoir des cassures dans la droite et c'est pas joli
        y=y+0.1*coef
        if (Math.abs(x-cos_droite[1-min_x][0])<0.11){ // si le dernier point placé à un distance inférieur à 0.11 du point le plus à droite (1-min) on considère que le trace est fini
            fini=true
        }
    }
    droite=false
    cos_droite=[]

}






function trace_rectangle(){//fonction qui trace le rectangle
    
    if (cos_rectangle[0][1]>cos_rectangle[1][1]){// on determine les minimum et les max
        max_y=cos_rectangle[0][1]
        min_y=cos_rectangle[1][1]
    }else{
        max_y=cos_rectangle[1][1]
        min_y=cos_rectangle[0][1]
    }

    if (cos_rectangle[0][0]>cos_rectangle[1][0]){
        max_x=cos_rectangle[0][0]
        min_x=cos_rectangle[1][0]
    }else{
        max_x=cos_rectangle[1][0]
        min_x=cos_rectangle[0][0]
    }

    for (x=min_x;x<max_x+1;x++){ // du minimum au maximum on rempli le pixels
        for (y=min_y;y<max_y+1;y++){
            temp = document.getElementById(x+"."+y);
            temp.style.backgroundColor=couleur
        }
    }

    cos_rectangle=[]
    rectangle=false
}




function trace_triangle(){//fonction qui trace le triangle
    xa=cos_triangle[0][0]
    ya=cos_triangle[0][1]
    xb=cos_triangle[1][0]
    yb=cos_triangle[1][1]
    xc=cos_triangle[2][0]
    yc=cos_triangle[2][1]
    //Si P , le point que l'on veux tester, l'équalité PAC+PBC+PBA=ABC est vrai si P est dans le triangle car sinon dans aumoins une des trois aires comportent un partie en dehors du triangle, généralisable sur tout les polygones qui ne se "recourbe" pas sur lui même)
    Aire_ABC=Math.abs(xa * (yb - yc) + xb * (yc - ya) + xc * (ya - yb))/2 //on calcule l'aire
    for (let xp=0;xp<nb_colonne;xp++){
        for (let yp=0;yp<nb_ligne;yp++){
            Aire_PAC=Math.abs(xp * (ya - yc) + xa * (yc - yp) + xc * (yp - ya)) / 2.0
            Aire_PBC=Math.abs(xp * (yb - yc) + xb * (yc - yp) + xc * (yp - yb)) / 2.0
            Aire_PBA=Math.abs(xp * (yb - ya) + xb * (ya - yp) + xa * (yp - yb)) / 2.0

            if (Math.abs(Aire_ABC-(Aire_PAC+Aire_PBC+Aire_PBA))<3){//pour éviter les problémes des trucs flottant on test la valeur absolue de la différences entre les deux
                temp = document.getElementById(xp+"."+yp);
                temp.style.backgroundColor=couleur
            }
        }
}
cos_triangle=[]
triangle=false
}





function trace_peinture(){ //fonction qui rempli la surface selectionner, on fait des variable locale car c'est une récursive  de compléxité O(trop compliqué pour moi mais c'est très beaucoup)
    var x=cos_peinture[0]
    var y=cos_peinture[1]
    var temp = document.getElementById(x+"."+y); 
    var couleur_cible=temp.style.backgroundColor // la couleur cible est celle de la surface que l'on souhaite modifer
    temp.style.backgroundColor=couleur //on modifie le premier pixel

    var point=[x,y]

    var pas=[[-1,0],[1,0],[0,1],[0,-1]]//on décide "propager" la couleur sur les 4 pixel directement collés au premier

    function propagation(point){
        var x=point[0]
        var y=point[1]
        for (let l=0;l<4;l++){
        
            try {
                var x_=x+pas[l][0]
                var y_=y+pas[l][1]
                var temp = document.getElementById(x_+"."+y_); 
                var couleur_point=temp.style.backgroundColor
                if (couleur_point==couleur_cible){ //si la couleur du pixel que l'on cible est équale à celle de la surface qu'on veux colorier on le colorie et lance une nouvelle "propagation" sur les 4 pixels qui sont à coté
                    temp.style.backgroundColor=couleur
                    propagation([x_,y_])
                }

            } catch (error) {       
        }}

    }
    propagation(point)
    peinture=false
}