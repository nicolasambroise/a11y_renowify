/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-11. Langue
Vérification de la présence de changement de langue
o Vérifier que le contenu rédigé dans une langue étrangère possède un attribut « lang » pertinent
*/
function check_part_11() {
  if (debug_flag) console.log('11 Langue');

  check_test_11a();
  check_test_11b();

/* TODO détecter du texte en langue étrangère en se basant sur les mots les plus courant ;
Note : Cela ne permettra pas de detecter des mots isolé comme Hardware, BabyYear, etc.

| Mot anglais | Type / usage                  | Pourquoi il est spécifique                     |
| ----------- | ----------------------------- | ---------------------------------------------- |
| **The**     | Article défini                | Article unique, structure différente ailleurs. |
| **Will**    | Auxiliaire de futur           | N'existe pas en tant que mot isolé.            |
| **Would**   | Modal conditionnel            | Spécifique au système verbal anglais.          |
| **Shall**   | Modal formel / futur          | Désuet mais sans équivalent lexical.           |
| **Might**   | Modal de possibilité          | Pas de mot unique équivalent.                  |
| **May**     | Permission / possibilité      | Intraduisible tel quel.                        |
| **Do**      | Auxiliaire syntaxique         | Fonction grammaticale unique.                  |
| **Does**    | Présent 3ᵉ personne de *do*   | Forme fléchie sans correspondance.             |
| **Did**     | Passé auxiliaire              | Pas d’équivalent lexical direct.               |
| **Should**  | Obligation douce              | Usage idiomatique anglais.                     |
| **Could**   | Capacité / possibilité passée | Intraduisible comme mot isolé.                 |
| **Must**    | Nécessité / obligation        | Modal spécifique.                              |
| **Yet**     | Adverbe de contraste / temps  | Polyvalence unique.                            |
| **Still**   | Adverbe temporel              | Pas de correspondance directe.                 |
| **Even**    | Adverbe d’intensité           | Sémantique idiomatique.                        |
| **Though**  | Conjonction concessive        | Intraduisible tel quel.                        |
| **Whether** | Conjonction conditionnelle    | Pas de mot unique.                             |
| **Some**    | Déterminant indéfini          | Intraduisible dans son usage large.            |
| **Any**     | Déterminant / pronom          | Usage très spécifique.                         |
| **Whose**   | Pronom possessif interrogatif | N’a pas d’équivalent lexical exact.            |


| Mot français | Type / usage                  | Pourquoi il est spécifique          |
| ------------ | ----------------------------- | ----------------------------------- |
| **On**       | Pronom indéfini               | Aucun équivalent exact.             |
| **Y**        | Pronom adverbial              | Structure unique au français.       |
| **En**       | Pronom partitif / lieu        | Intraduisible directement.          |
| **Chez**     | Préposition idiomatique       | Pas d’équivalent lexical.           |
| **Dont**     | Pronom relatif                | Fonction unique.                    |
| **Même**     | Adjectif / adverbe / pronom   | Usage multiple sans équivalent.     |
| **Encore**   | Adverbe de temps / répétition | Polyvalence propre au français.     |
| **Déjà**     | Adverbe temporel              | Intraduisible mot à mot.            |
| **Tant**     | Adverbe de quantité           | Structure spécifique.               |
| **Bientôt**  | Adverbe temporel              | Structure spécifique.               |
| **Quoique**  | Conjonction concessive        | Intraduisible lexicalement.         |
| **Lorsque**  | Conjonction temporelle        | Absent sous cette forme ailleurs.   |
| **Puisque**  | Conjonction de cause          | Mot unique français.                |
| **Ainsi**    | Adverbe de conséquence        | Intraduisible mot pour mot.         |
| **Voire**    | Adverbe d’intensification     | Inexistant ailleurs.                |
| **Autant**   | Adverbe de comparaison        | Pas d’équivalent isolé.             |
| **Leur**     | Pronom possessif / datif      | Usage spécifique.                   |
| **Soi**      | Pronom réfléchi neutre        | Inexistant ailleurs.                |
| **Se**       | Pronom réfléchi               | Fonction grammaticale unique.       |
| **Aucun**    | Déterminant / pronom          | N’existe pas lexicalement ailleurs. |

| Mot allemand   | Type / usage                             | Pourquoi il est spécifique              |
| -------------- | ---------------------------------------- | --------------------------------------- |
| **doch**       | Particule affirmative / de contradiction | Incomparable.                           |
| **halt**       | Particule modale (acceptation)           | Intraduisible.                          |
| **eben**       | Particule d’évidence                     | Typiquement allemand.                   |
| **denn**       | Particule interrogative / causale        | Usage idiomatique.                      |
| **schon**      | Adverbe temporel / modulateur            | Sens multiple, non lexicalisé ailleurs. |
| **sich**       | Pronom réfléchi                          | Structure grammaticale spécifique.      |
| **selbst**     | Réflexif / emphatique                    | Intraduisible simplement.               |
| **nachdem**    | Locution conditionnelle                  | Pas de construction équivalente.        |
| **wobei**      | Pronom relatif composé                   | Structure propre à l’allemand.          |
| **weshalb**    | Conjonction de cause                     | Pas de mot équivalent isolé.            |
| **zumindest**  | Adverbe concessif                        | Structure lexicale unique.              |
| **außerdem**   | Adverbe d’ajout / argument               | Mot composé idiomatique.                |
| **immerhin**   | Adverbe de concession                    | Pas de mot simple en fr./angl.          |
| **sowieso**    | Adverbe d’évidence / résignation         | Intraduisible tel quel.                 |
| **damit**      | Conjonction finale                       | Fusion lexicale typique.                |
| **deshalb**    | Adverbe consécutif                       | Forme composée spécifique.              |
| **zwar**       | Particule contrastive                    | Intraduisible.                          |
| **jeweils**    | Adverbe distributif                      | Pas de mot exact en fr./angl.           |
| **nirgends**   | Adverbe de lieu négatif                  | Intraduisible en un seul mot.           |
| **irgendwann** | Adverbe temporel indéfini                | Signifie "un jour"                      |


 */
}
