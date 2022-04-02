	// Variables
	// START_B = chr(204)
	// START_C = chr(205)
	// GOTO_B = chr(200)
	// GOTO_C = chr(199)
	// FINNISH = chr(206)

function Code128(chaine){
	var chaine = String(chaine),
  Longueur_du_mot = chaine.length,
	index_fixe = 0, //index fixe,
	index_temp = 0, //index temporaire,
  Nb_test = 4,
	Chaine_caracteres_temp = chaine.substring(index_fixe, (index_fixe + Nb_test)), //Chaine de caractères temporaire,
	Caractere_temp = chaine.substring(index_fixe, (index_fixe + 1)),
	Table_C = false,
  CCT_Int = parseInt(Chaine_caracteres_temp, 10),
  Calcul = 0;

	function Test_C(chaine){
    Chaine_caracteres_temp = chaine.substring(index_fixe, (index_fixe + Nb_test))
      if(isNaN(Chaine_caracteres_temp)){
        Table_C = false;
      }else{
        Table_C = true;
      }
  }


  function MaJ(){
    Chaine_caracteres_temp = chaine.substring(index_fixe, (index_fixe + Nb_test)),
    CCT_Int = parseInt(Chaine_caracteres_temp, 10),
    Caractere_temp = chaine.substring(index_fixe, (index_fixe + 1));
  }


  if(Longueur_du_mot < 4){
    Code128 = String.fromCharCode(204);
    for (; index_fixe < Longueur_du_mot; MaJ()){
      console.log("fixe = " + index_fixe + " Caract = " + Caractere_temp + " chaine = " + Chaine_caracteres_temp)
      Code128 += Caractere_temp,
      index_fixe += 1;
    }
  }else{
    if (isNaN(Chaine_caracteres_temp)){
      Table_C = false,
      Code128 = String.fromCharCode(204);
    }else{
      Table_C = true
      Code128 = String.fromCharCode(205);
    }while(index_fixe < Longueur_du_mot){
      if (Table_C == true){
        for (index_temp = 0, Nb_test = 2, MaJ(); index_temp < 2; MaJ()){
          if (isNaN(Chaine_caracteres_temp)){
            Table_C = false,
            Code128 += String.fromCharCode(200);
            break;
          }else{
            if (Chaine_caracteres_temp.length == 2){
              if (Chaine_caracteres_temp < 95){
                CCT_Int += 32;
              }else{
                CCT_Int += 105;
              }Code128 += String.fromCharCode(CCT_Int),
              index_fixe += 2,
              index_temp += 2;
            }else if (Chaine_caracteres_temp.length == 1){
              Table_C = false,
              Code128 += String.fromCharCode(200)+Chaine_caracteres_temp,
              index_fixe += 1,
              index_temp += 1;
              break;
              break;
            }
          }
        }
      } // ferme if Table C = true
      if(Table_C == false){
        for (MaJ(); index_fixe < Longueur_du_mot; MaJ()){
          if (isNaN(Caractere_temp)){
            Code128 += Caractere_temp,
            index_fixe += 1;
          }else{
            if (Longueur_du_mot - index_fixe >= 6){
              Nb_test = 6,
              Test_C(chaine);
              if (Table_C == true){
                Code128 += String.fromCharCode(199);
                break
              }else{
                Code128 += Caractere_temp,
                index_fixe += 1;
              }
            }else if(Longueur_du_mot - index_fixe == 4){
                Nb_test = 4,
                Test_C(chaine);
                if (Table_C == true){
                  Code128 += String.fromCharCode(199);
                  break;
                }else{
                  Code128 += Caractere_temp,
                  index_fixe += 1;
                }
              }else{
                Code128 += Caractere_temp,
                index_fixe += 1
              }
            }
          } // ferme le for
        } // ferme Table C = false
      } // fermeture while
    } // fermeture du else
    //calcul de la clef
    Caractere_temp = Code128.charCodeAt(0),
    CCT_Int = parseInt(Caractere_temp,10)
    if(CCT_Int < 127){
      Calcul = CCT_Int - 32;
    }else{
      Calcul = CCT_Int - 100;
    }
    for (index_fixe = 1; index_fixe < Code128.length; index_fixe +=1){
      Caractere_temp = Code128.charCodeAt(index_fixe)
      CCT_Int = parseInt(Caractere_temp,10)
      if (CCT_Int < 127){
        CCT_Int -= 32;
      }else{
        CCT_Int -= 100;
      }
      Calcul += (CCT_Int * index_fixe);
    }
    Calcul = Calcul % 103;
    if (Calcul < 95){
      Calcul += 32;
    }else{
      Calcul += 100;
    }
    Code128 += String.fromCharCode(Calcul) + String.fromCharCode(206);

  return Code128
  } // fermeture de la fonction code128