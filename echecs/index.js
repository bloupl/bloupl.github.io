function initialisation(){

    //on initialise tout les variables et le fond du plateau
    levé=[false,0,0]
    jeu=[["tb","cb","fb","db","rb","fb","cb","tb"],["pb","pb","pb","pb","pb","pb","pb","pb"],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["pj","pj","pj","pj","pj","pj","pj","pj"],["tj","cj","fj","dj","rj","fj","cj","tj"]]
    fond()
    dessin()
}
function fond(){
    //fonction qui remet le fond du plateau comme initialement
    for (let x=0;x<8;x++){
        for (let y=0;y<8;y++){
            case_=document.getElementById(""+x+""+y+"");
            if ((x+y)%2==0){
                case_.style.backgroundColor="brown"
            
            }else{
                case_.style.backgroundColor="rgb(0, 82, 3)"
            }
            
        }
    
    }
}
function dessin(){
    //fonction qui affiche les pièces 
    for (let x=0;x<8;x++){
        for (let y=0;y<8;y++){
            if (jeu[x][y]!=""){
                case_=document.getElementById(""+y+""+x+"").innerHTML='<img src="images/'+jeu[x][y]+'.png"></img>';
            }else{
                case_=document.getElementById(""+y+""+x+"").innerHTML=" ";
            }
        }
    }
}

function val_piece(cos){

    //fonction qui renvoie la valeur de la pièce  si la case existe, renvoie " " si case vide et "un" si la case ciblé n'est pas dans le tableau
    try{
    piece_val=document.getElementById(""+cos[0]+""+cos[1]+"").innerHTML;
    if (piece_val.length>2){
        piece_val=piece_val[17]+piece_val[18]
    }
    
        return piece_val
    }catch{
        return "un"
    }
}

function mov_possible(cos){

    //fonction qui permet de calculer tout les coups possible selon la case de la pièce
    piece=val_piece([cos[0],cos[1]])
    possible=[]
    if (piece[0]=="p"){
        //pion
        if (piece[1]=="j" && val_piece([cos[0],cos[1]-1])==" "){
            possible.push([cos[0],cos[1]-1])
            if (val_piece([cos[0],cos[1]-2])==" " && cos[1]==6){
                possible.push([cos[0],cos[1]-2])

            }
        }
        if (piece[1]=="b" &&  val_piece([cos[0],cos[1]+1])==" "){
            possible.push([cos[0],cos[1]+1])
            if (val_piece([cos[0],cos[1]+2])==" " && cos[1]==1){
                possible.push([cos[0],cos[1]+2])

            }
        }//ajoute les cases possible en avencant devant (2 pour le premier moove)

        if (piece[1]=="j"){
            if (val_piece([cos[0]+1,cos[1]-1])!=" " && val_piece([cos[0]+1,cos[1]-1])!="un"){
                possible.push([cos[0]+1,cos[1]-1])
            }
            if (val_piece([cos[0]-1,cos[1]-1])!=" " && val_piece([cos[0]-1,cos[1]-1])!="un"){
                possible.push([cos[0]-1,cos[1]-1])
            }
        }else{
            if (val_piece([cos[0]+1,cos[1]+1])!=" " && val_piece([cos[0]+1,cos[1]+1])!="un"){
                possible.push([cos[0]+1,cos[1]+1])
            }
            if (val_piece([cos[0]-1,cos[1]+1])!=" " && val_piece([cos[0]-1,cos[1]+1])!="un"){
                possible.push([cos[0]-1,cos[1]+1])
            }
        }
        //ajoute les case possible pour capturer sur le cotés 
    }else if (piece[0]=="t"){
        //tour
        touché=false
        pas=0
        while (touché==false && pas+1<=cos[1]){
            pas++
            if (val_piece([cos[0],cos[1]-pas])==" "){
                possible.push([cos[0],cos[1]-pas])}
            else{

                if (val_piece([cos[0],cos[1]-pas])[1]!=val_piece([cos[0],cos[1]])[1]){
                possible.push([cos[0],cos[1]-pas])
                
                }touché=true
            }

            }
        
        touché=false
        pas=0
        while (touché==false && cos[1]+pas+1<8){

            pas++
            console.log([cos[0],cos[1]+pas])
            if (val_piece([cos[0],cos[1]+pas])==" "){
                possible.push([cos[0],cos[1]+pas])

            }else{
                if (val_piece([cos[0],cos[1]+pas])[1]!=(val_piece([cos[0],cos[1]])[1])){
                possible.push([cos[0],cos[1]+pas])
                
                }
                touché=true
            }
    
        }

        //ajoute les deux lignes jusqu'a rencontré un obstacle, si c'est un enemi on ajoute la possibilité de la manger
        touché=false
        pas=0
        while (touché==false && pas+1<=cos[0]){
            pas++
            if (val_piece([cos[0]-pas,cos[1]])==" "){
                possible.push([cos[0]-pas,cos[1]])}
            else{
                if (val_piece([cos[0]-pas,cos[1]])[1]!=(val_piece([cos[0],cos[1]])[1])){
                possible.push([cos[0]-pas,cos[1]])
                
                }touché=true
            }

            }
        
        touché=false
        pas=0
        while (touché==false && cos[0]+pas+1<8){

            pas++
            console.log([cos[0]+pas,cos[1]])
            if (val_piece([cos[0]+pas,cos[1]])==" "){
                possible.push([cos[0]+pas,cos[1]])}
            else{
                if (val_piece([cos[0]+pas,cos[1]])[1]!=piece[1]){
                possible.push([cos[0]+pas,cos[1]])
                }
                touché=true
            }
    
        }
        //ajoute les deux colonne jusqu'a rencontré un obstacle, si c'est un enemi on ajoute la possibilité de la manger
        

    }else if (piece[0]=="c"){
        //cavalier
        pas=[[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1]]
        for (let i=0; i<pas.length;i++){
            dx=pas[i][0]
            dy=pas[i][1]
            console.log(val_piece([cos[0]+dx,cos[1]+dy])[1],piece[1])
            if (val_piece([cos[0]+dx,cos[1]+dy])!="un" &&val_piece([cos[0]+dx,cos[1]+dy])[1]!=piece[1] ){
                possible.push([cos[0]+dx,cos[1]+dy])

            }

        }
        //parcoure la liste "pas" et regarde si la case ciblé est définie et si c'est un enemie
    } else if (piece[0]=="f"){
        pas=0
        //fou
        //on regarde toute la diagonale de coefficient directeur 1
        while (val_piece([cos[0]-pas,cos[1]-pas])!="un"){
            pas++
            console.log("test")
            if (val_piece([cos[0]+pas,cos[1]+pas])[1]!=piece[1]){
                possible.push([cos[0]+pas,cos[1]+pas])
            }
        }
    } else if (piece[0]=="d"){
        //dame
    } else if (piece[0]=="r"){
        //roi
    }


    return possible};
function jouer(cos){
    x=cos[0]
    y=cos[1]
    if (levé[0]==false){
        levé=[true,x,y]
        document.getElementById(""+x+""+y+"").style.backgroundColor="rgb(0, 255, 255)"
        ancien=[parseInt(levé[1]),parseInt(levé[2])];
        possible=mov_possible(ancien)
        for (let i=0;i<possible.length;i++){
            case_=document.getElementById(""+possible[i][0]+""+possible[i][1]+"")
            case_.style.backgroundColor="rgb(120, 82, 3)"
        }

    }else{
        if (x==levé[1] && y==levé[2]){
            levé[0]=false
            fond()
        }
        ancien=[parseInt(levé[1]),parseInt(levé[2])];
        nouveau=[parseInt(x),parseInt(y)];

        verif=false

        for (let i=0;i<possible.length;i++){
            if (nouveau[0]==possible[i][0] && nouveau[1]==possible[i][1]){
                verif=true
            }

        }
        if (verif){
            piece=document.getElementById(""+levé[1]+""+levé[2]+"").innerHTML;
            case_=document.getElementById(""+levé[1]+""+levé[2]+"").innerHTML=" "
            document.getElementById(""+x+""+y+"").innerHTML=piece
            levé[0]=false
            fond()
    }   }

}
