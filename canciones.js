/*
  CANCIONERO PAL' FOGÓN — las canciones

  Cada canción tiene:
    titulo  → nombre de la canción
    ritmo   → zamba, chacarera, chamamé, cueca...
    tono    → el tono en que está ESCRITA la letra de abajo
    miTono  → el tono en que la cantás vos (la app la muestra así al abrirla)
    letra   → acordes ENCIMA de la letra, como en el cancionero de papel

  Reglas para escribir la letra:
    - Una línea con solo acordes, seguida de una línea de letra = acordes sobre esa letra.
    - "Intro: Dm Am E7 Am (x2)" = etiqueta + acordes sueltos.
    - Una línea TODA EN MAYÚSCULAS (ESTRIBILLO, SEGUNDA, ...) = título de sección.
    - Línea vacía = separación entre estrofas.
*/

const CANCIONES = [

{
  titulo: "Perfume de carnaval",
  ritmo: "Zamba",
  tono: "Bm",
  miTono: "Bm",
  letra: `
Bm              D
Me voy solo con mi suerte
         A7         D
la llevaré en mi recuerdo
B7              Em
bajo un añoso algarrobo
B7              Em
cortaba el aire un pañuelo
F#7             G
bailando una vieja zamba
             D      F#7 Bm
yo le entregaba mis sueños.

Bm              D
El sol quemaba en la tarde
         A7         D
siluetas que parecían
B7              Em
fantasmas amarillentos
B7              Em
llenos de tierra y de vida
F#7             G
y yo rendido a tus ojos
             D      F#7 Bm
sintiendo que me querías.

ESTRIBILLO
Am B7           Em
¡Ay! Perfume de carnaval
     A7         D
ya nunca la hei de olvidar
     B7         Em
su piel llevaba el aroma
     B7         Em
de flor y tierra mojada
F#7             G
bellos recuerdos que siempre
             D F#7 Bm
los llevo dentro del alma.

SEGUNDA
Bm                          D
¡Ay! Tiempos donde han quedado
            A7              D
donde he perdido mis sueños
B7                          Em
quién sabe si ella se acuerda
B7                          Em
de un viejo mes de febrero
F#7                      G
y de aquel baile del campo
         D      F#7 Bm
y de mi amor verdadero.

Bm           D
No quise decirte nada
         A7                 D
la amé en silencio esa tarde
B7           Em
y sobre sus trenzas negras
B7           Em
dejé mis coplas sentidas
F#7          G
me fui llevando sus ojos
         D       F#7 Bm
un miércoles de cenizas.

ESTRIBILLO
Am B7        Em
¡Ay! Perfume de carnaval
     A7      D
ya nunca la hei de olvidar
     B7      Em
su piel llevaba el aroma
     B7      Em
de flor y tierra mojada
F#7          G
bellos recuerdos que siempre
         D F#7 Bm
los llevo dentro del alma.
`
},

{
  titulo: "Flor azul",
  ritmo: "Chacarera",
  tono: "Am",
  miTono: "Am",
  letra: `
Intro: Dm Am E7 Am (x2)

Am
Que solo me voy quedando
Dm Am
mi viejo tunal
Dm Am
oyendo cantar al río
E7  Am
para el carnaval.

Intro: Dm Am E7 Am (x2)

Am
Me acompaña la esperanza
Dm Am
en la soledad
Dm Am
cuando silba el huairamuyo
E7  Am
por el salitral.

Intro: Dm Am E7 Am (x2)

Am
Árbol fuiste bien coposo,
Dm Am
pobre corazón,
Dm Am
árbol que quedó sin hojas
E7  Am
sin nido, ni amor.

ESTRIBILLO
Am
Dile, dile chacarera
Dm Am
a esa flor azul
Dm Am
que de noche yo la busco
E7  Am
por la cruz del sur.

SEGUNDITA
Intro: Dm Am E7 Am (x2)

Am
Esa pena enamorada
Dm Am
pena sin cesar
Dm Am
buscando volverse copla
E7  Am
pa' hacerme llorar.

Intro: Dm Am E7 Am (x2)

Am
Cuando recuerdo sus ojos
Dm Am
de dulce mirar,
Dm Am
me acomodo con mi perro
E7  Am
solito a pitar.

Am
Amalaya con la suerte
Dm Am
que a mí me ha tocao
Dm Am
cantar por cantar, cantando
E7  Am
sin ser escuchao.

ESTRIBILLO
Am
Dile, dile chacarera
Dm Am
a esa flor azul
Dm Am
que de noche yo la busco
E7  Am
por la cruz del sur.
`
},

{
  titulo: "Entra a mi pago sin golpear",
  ritmo: "Chacarera",
  tono: "Dm",
  miTono: "Am",
  letra: `
Intro: A7 Dm (x2) · Dm F A7 Dm (x2)

    Bb                           C              F
Fue mucho mi penar andando lejos del pago
F       G                           F
Tanto correr pa' llegar a ningún lado
A7             Dm                A7 Dm
Si estaba donde nací lo que buscaba por ahí.

Intermedio: Dm F A7 Dm (x2)

    Bb                           C              F
Es solo la amistad que no se compra ni vende
F       G                              F
Solo se da cuando en el pecho se siente
A              Dm
No es algo que se ha de usar
A7             Dm
cuando le sirva y nada más.

Intermedio: Dm F A7 Dm (x2)

    Bb                        C              F
Así es como se da en la amistad mis paisanos
F           G                             F
Sus manos son pancacho y mate cebado
A              Dm
Y la flor de la humildad
A              Dm
suele su rancho perfumar.

ESTRIBILLO
    Bb                              C              F
La vida me han prestau y tengo que devolverla
F           G                             F
Cuando el creador me llame para la entrega
A              Dm
Que mis huesos piel y sal
A              Dm
abonen de mi suelo natal.

SEGUNDITA
Intro: A7 Dm (x2) · Dm F A7 Dm (x2)

   Bb                         C             F
La luna es un terrón que alumbra con luz prestada
F           G                            F
Solo al cantor que canta coplas del alba
A              Dm
Le estalla en el corazón
A              Dm
eso que trepa por su voz.

Intermedio: Dm F A7 Dm (x2)

Bb                            C                F
Cantor para cantar si nada dicen sus versos
F      G                         F
Ay para qué vas a callar al silencio
A              Dm
Si ese silencio cantor
A              Dm
lleno de duendes en la voz.

Intermedio: Dm F A7 Dm (x2)

   Bb                         C                F
Mi pueblo es un cantor que canta la chacarera
F           G                               F
No ha de cantar lo que muy dentro no sienta
A              Dm
Cuando lo quiera escuchar
A              Dm
entra a mi pago sin golpear.

ESTRIBILLO
Bb                                    C           F
La vida me han prestau y tengo que devolverla
F           G                               F
Cuando el creador me llame para la entrega
A                       Dm
Que mis huesos piel y sal
A                       Dm
abonen de mi suelo natal.
`
},

{
  titulo: "Carito",
  ritmo: "Chamamé",
  tono: "D",
  miTono: "D",
  letra: `
   D
Sentado solo en un banco en la ciudad,
                            Em
con tu mirada recordando el litoral,
       G                        D              B7
tu suerte quiso estar partida mitad verdad, mitad mentira,
       Em               A7           D
como esperanza de los pobres prometida.

D
Andando solo bajo la llovizna gris,
                                Em
fingiendo duro que tu vida fue de aquí.
          G                                    D             B7
¿Por qué cambiaste un mar de gente por donde gobierna la flor?
       Em     A7                D D7
Mirá que el río nunca regaló el color.

ESTRIBILLO
G      F#m B7
Carito, yo soy tu amigo
   Em A7                 Am7 D7
Me ofrezco árbol para tu nido
G      F#m B7
Carito, suelta tu canto
   Em                    A7    Am7 D7
Que el abanico en mi acordeón lo está esperando

Solo de armónica: Em A7 D B7 Em A7 D D7 G A7 D B7 Em A7 D

G            F#m B7
Carito, suelta tu pena
       Em     A7                Am7 D7
Se haga diamante tu lágrima entre mis cuerdas
G            F#m B7
Carito, suelta tu piedra
   Em         A7                D
Para volar como el zorzal en primavera

Solo de armónica: Em A7 D B7 Em A7 D D7 G A7 D B7 Em A7 D

   D
En Buenos Aires los zapatos son modernos,
                                        Em
pero no lucen como en la plaza de un pueblo.
       G                                D           B7
Dejá que tu luz chiquitita le hable en secreto a la canción
          Em              A7            D
para que te ilumine un poco más el sol.

D
Cualquier semilla cuando es planta quiere ver
                                Em
la misma estrella de aquel atardecer,
       G                        D              B7
que la salvó del pico agudo refugiándola al oscuro
       Em               A7           D
de la gaviota arrasadora de los surcos.
`
},

{
  titulo: "Al jardín de la república",
  ritmo: "Zamba",
  tono: "Em",
  miTono: "Dm",
  letra: `
Intro: B7 Em B7 Em

        G          D        G
Desde el norte traigo en el alma
    D       G D             G
La alegre zamba que canto aquí
    B7             Em
Y que bailen los tucumanos
    B7             Em
Con entusiasmo propio de allí
    B7             Em
Cada cual sigue a su pareja
    B7             Em
Joven o viejo de todo vi

        G          D        G
Media vuelta y la compañera
D           G D             G
Forma una rueda para seguir
    B7             Em
Viene el gaucho le hace un floreo
    B7             Em
Y un zapateo comienza allí
    B7             Em
Sigue el gaucho con su floreo
    B7             Em
Y el zapateo comienza allí

ESTRIBILLO
E7      Am
Para las otras no
D7      G
Pa' las del norte sí
    B7             Em
Para las tucumanas
    B7             Em
Mujer galana naranjo en flor
    B7             Em
Todo lo que ellas quieran
    B7             Em
Que la primera ya terminó

Intro: B7 Em B7 Em

        G          D        G
No me olvido, viera compadre
    D       G D             G
De aquellos bailes que hacen allí
    B7             Em
Tucumanos y tucumanas
    B7             Em
Todos se afanan por divertir
    B7             Em
Y se hace linda esta mala vida
    B7             Em
Así se olvida que hay que morir

        G          D       G
Empanadas y vino en jarra
D G         D          G
Una guitarra bombo y violín
    B7             Em
Y unas cuantas mozas bizarras
    B7             Em
Pa' que la farra pueda seguir
    B7             Em
Sin que falten esos coleros
    B7             Em
Viejos cuenteros que hagan reír

ESTRIBILLO
E7      Am
Para las otras no
D7      G
Pa' las del norte sí
    B7             Em
Para las de Simoca
    B7             Em
Mis ansias locas de estar allí
    B7             Em
Para brindarles mi alma
    B7             Em
En esta zamba que canto aquí
`
},

{
  titulo: "Arenosa",
  ritmo: "Cueca",
  tono: "Bm",
  miTono: "Bm",
  letra: `
Bm F#7 Bm
Arenosa, arenosita
A7 D
Mi tierra cafayateña
    G              E
El que bebe de su vino
F#7         Bm
Gana sueño y pierde pena
    G              E
El que bebe de su vino
F#7         Bm
Gana sueño y pierde pena

Bm F#7 Bm
El agua de Calchaquí
A7                 D
Padre de todas las siembras
    G                      E
Cuando uno se va y no vuelve
F#7         Bm
Canta llorando y se aleja
    G                      E
Cuando uno se va y no vuelve
F#7         Bm
Canta llorando y se aleja

ESTRIBILLO
Em A7
Arena, arenita
G               D
Arena, tapa mi huella
Bm              E
Para que en las vendimias
   F#7          Bm
Mi vida yo vuelva a verla
Bm              E
Para que en las vendimias
   F#7          Bm
Mi vida yo vuelva a verla

SEGUNDA
Bm F#7 Bm
Luna de los medanales
A7          D
Lunita cafayateña
    G              E
Luna de arena morena
   F#7          Bm
En carnavales de ausencia
     G             E
Luna de arena morena
   F#7          Bm
En carnavales de ausencia

Bm F#7 Bm
Deja que beba en tu vino
   A7 D
savia cafayateña
     G             E
Y que me pierda en la cueca
     F#7                 Bm
Cantando antes que me muera
        G             E
Y que me pierda en la cueca
F#7         Bm
Cantando antes que me muera

ESTRIBILLO
Em A7
Arena, arenita
G               D
Arena, tapa mi huella
Bm                 E
Para que en las vendimias
   F#7          Bm
Mi vida yo vuelva a verla
G               E
Para que en las vendimias
   F#7          Bm
Mi vida yo vuelva a verla
`
},

{
  titulo: "La simple (Solo pa' bailarla)",
  ritmo: "Chacarera",
  tono: "Am",
  miTono: "F#m",
  letra: `
Intro: E7 Am

Am           E7
Esta es solo pa' bailarla
E7              Am
esta simple chacarera
Am           E7
con un poco de tierrita
E7           Am
baila cualquiera

Intro: E7 Am

Am           E7
Tiene sangre emborrachada
E7              Am
y una noche que ya es nuestra
Am           E7
alcanza para empaparme
E7           Am
y matar las penas

Intro: E7 Am

Am           E7
No hay final para esta noche
E7              Am
mientras haiga chacarera
Am           E7
infinita colección
E7           Am
pedí la que quieras

ESTRIBILLO
Am           E7
Esta es solo pa' bailarla
E7              Am
esta simple chacarera
Am           E7
con un poco de tierrita
E7           Am
baila cualquiera

SEGUNDA
Inter: E7 Am

Am           E7
Hay para todos los gustos
E7              Am
te emocionan, te enamoran
Am          E7
y cuando la escuchan lejos
E7              Am
muchos la lloran

Intro: E7 Am

Am          E7
La sangre de la guitarra
E7              Am
y las manos santiagueñas
Am          E7
la combinación perfecta
E7              Am
sobre las cuerdas

Intro: E7 Am

Am          E7
Sea simple, sea doble
E7              Am
en el corazón retumba
Am          E7
como si fuera que un bombo
E7          Am
al pecho te apunta

ESTRIBILLO
Am          E7
Esta es solo pa' bailarla
E7              Am
esta simple chacarera
Am          E7
con un poco de tierrita
E7          Am
baila cualquiera
`
},

{
  titulo: "El olvidado",
  ritmo: "Chacarera",
  tono: "Am",
  miTono: "Em",
  letra: `
Intro: Am Dm E7 Am (x2)

Am Dm E7                Am
Soy el que quedó en medio e' los rancho
F           B7                      E7
guacho de fia'o a mate y guiso inventado
Dm  Am                  E7               Am
hambre y rebelión fueron creciendo en mis manos

Am Dm E7                Am
de tu palo soy hijo de tu cuero
F           B7                      E7
soy el olvidao en la alcancía del tiempo
Dm      Am              E7               Am
el que se quedó de pie poniéndole el pecho

Intro: Am Dm E7 Am (x2)

Am Dm E7                Am
No quiero de más quiero lo que es mío
F           B7                      E7
almas o trampiao voy a torcerle el destino
Dm  Am                  E7               Am
levantate cagón que aquí canta un argentino

Am Dm E7                Am
flor obrera soy silvestre de espuma
F           B7                      E7
cuando el tren se va miro en las vías la luna
Dm      Am              E7               Am
pensando tal vez mi pago encuentre fortuna

Intro: Am Dm E7 Am (x2)

ESTRIBILLO
Am Dm E7                Am
Soy el olvidao el mismo que un día
F                           G C
se puso de pie tragando tierra y saliva
Dm      Am              E7               Am
caminó hacia el sol para curar las heridas

Am Dm E7                Am
Mi bofe se hinchó cuando repartieron
F                           B7               E7
de mí no se acuerdan dicen que nunca me vieron
Dm      Am              E7               Am
que no soy de aquí que ya no tengo remedio

ESTRIBILLO
Am Dm E7                Am
Soy el olvidao el mismo que un día
F                           G C
se puso de pie tragando tierra y saliva
Dm      Am              E7               Am
caminó hacia el sol para curar las heridas

SEGUNDA
Intro: Am Dm E7 Am (x2)

Am Dm E7                Am
Una herida soy buscando el salario
F                           B7               E7
maestro de pie cuidando pichones blancos
Dm      Am              E7               Am
que madurarán iluminando mi pago

Intro: Am Dm E7 Am (x2)
`
},

{
  titulo: "Chacarera de la tía Rosa",
  ritmo: "Chacarera",
  tono: "C",
  miTono: "A",
  letra: `
Intro: D G D G (x2)

C
Andaba yo por el monte y pasó un carancho zumbando
   G                              D             G
Y atrás una manga'i lora que lo traían cascoteando

Intro: D G D G (x2)

C
Me topé con un zorrito y me topé una yarará
   G                                 D G
Me he topau con tus ojitos chiquita por qué será

Intro: D G D G (x2)

Laraira laraira larailalalala-la

C
Lo otro día por las casas ha pasao la tía Rosa
G                                 D G
Andaba desesperada buscando no sé qué cosa

ESTRIBILLO
   C                                 D
Chacaré chacarerita de los montes sí señor
      D                    G         D               G
Que bailen grandes y chicos, plantas y bichos y qué sé yo

SEGUNDA
Intro: D G D G (x2)

C
Igual que aquellas catitas los de abajo se han unido
G                                 D G
Pa' espantar al gato grande cuando saquea los nidos

Intro: D G D G (x2)

C
Chinita arisca del monte ojitos de sachacabra
G                                 D G
No me has dao para trampearte vidita media palabra

Intro: D G D G (x2)

C
Me acuerdo lo que buscaba la tía Rosa esa vuelta
G                                 D G
Buscaba no sé qué flores que la poniban contenta

ESTRIBILLO
   C                                 D
Chacaré chacarerita de los montes sí señor
      D                  G             D
Que bailen todos y todas mientras más seamos mucho
G
mejor
`
},

{
  titulo: "Cachito, campeón de Corrientes",
  ritmo: "Chamamé",
  tono: "G",
  miTono: "E",
  letra: `
Instrumental acordeón: D G D G · C G · D C G

G
Desde Corrientes a Buenos Aires un señor lo vino a buscar,
                                      D
cuando estacionó su auto vino el barrio a saludar:
F                C                 G
¡Chau, Cachito, chau! Vas a ser el campeón,
   F                           C   G
desde aquí te alentaremos por la televisión.
   D C G
Oy-oy-oy, oy-oy-oy, oy-oy-oy.

G
En la noche del debut Corrientes 'taba prendido,
                                      D
y un solo grito se oyó cuando el correntino entró:
F                   C                          G
¡Vamos, Cachito, vamos, debés ser el campeón!
F                              C      G
Desde aquí te alentaremos por la televisión.
   D C G
Oy-oy-oy, oy-oy-oy, oy-oy-oy.

Instrumental acordeón: D G D G · C G · D C G

G
El correntino saltarín mostraba su inocencia,
                                      D
y entre las cuerdas se vio sangrar sus redondas cejas.
F                   C                          G
¿Qué pensará mi madre? Ay, ay, sí, ¿qué pensará?
F                              C      G
¿Qué pensará mi barrio? Ay, ay, sí, ¿qué pensará?
   D C G
Oy-oy-oy, oy-oy-oy, oy-oy-oy.

G
¿Qué me estará pasando, que no lo puedo parar?
                    D
Este me está matando de verdad...
F                   C                          G
¿Cómo estará mi madre? Ay, ay, sí, ¿cómo estará?
F                              C      G
¿Cómo estará mi pueblo? Ay, ay, sí, ¿cómo estará?
   D C G
Oy-oy-oy, oy-oy-oy, oy-oy-oy.

Instrumental acordeón: D G D G · C G · D C G

G
Llora Corrientes, llora la derrota de su campeón,
                                              D
el jueves llega Cachito en el micro de las dos...
F               C                 G
Y ese señor del auto no aparece por Corrientes
   F                           C  G
porque dice que es suficiente el dinero que ganó,
   D C G
Oy-oy-oy, oy-oy-oy, oy-oy-oy.

F               C                 G
Y ese señor del auto no aparece por Corrientes
F               C                 G
porque dice que es suficiente el dinero que ganó.
   D C G
Oy-oy-oy, oy-oy-oy, oy-oy-oy.
`
},

{
  titulo: "Luna tucumana",
  ritmo: "Zamba",
  tono: "Dm",
  miTono: "Dm",
  letra: `
Intro: Gm Dm A7 Dm A7 Dm

    A7      Dm
Yo no le canto a la luna
    A7         Dm
porque alumbra nada más
Gm      Dm
le canto porque ella sabe
A7      Dm
de mi largo caminar.
Gm      Dm
le canto porque ella sabe
A7      Dm
de mi largo caminar.

    A7      Dm
Ay lunita tucumana
A7          Dm   D7
tamborcito calchaquí
Gm      Dm
compañera de los gauchos
A7      Dm
en la senda del Tafí.
Gm      Dm
compañera de los gauchos
A7      Dm
en la senda del Tafí.

ESTRIBILLO
C7      F
Perdido en las cerrazones
    C7                 F       D7
quién sabe vidita por dónde andaré
Gm      Dm
mas cuando salga la luna
A7 Dm
cantaré, cantaré
Gm      Dm
a mi Tucumán querido
A7      Dm
cantaré, cantaré, cantaré.

SEGUNDA
Intro: Gm Dm A7 Dm A7 Dm

    A7      Dm
Con esperanza o con pena
    A7 Dm
en los campos de Acheral
Gm          Dm
yo he visto a la luna buena
A7      Dm
besando el cañaveral.
Gm      Dm
yo he visto a la luna buena
A7      Dm
besando el cañaveral.

    A7            Dm
En algo nos parecemos
    A7            Dm
luna de la soledad
Gm      Dm
yo voy andando y cantando
    A7            Dm
que es mi modo de alumbrar.
Gm      Dm
yo voy andando y cantando
    A7            Dm
que es mi modo de alumbrar.

ESTRIBILLO
C7      F
Perdido en las cerrazones
    C7                 F       D7
quién sabe vidita por dónde andaré
Gm      Dm
mas cuando salga la luna
A7 Dm
cantaré, cantaré
Gm      Dm
a mi Tucumán querido
A7      Dm
cantaré, cantaré, cantaré.
`
},

{
  titulo: "Luna cautiva",
  ritmo: "Zamba",
  tono: "D",
  miTono: "D",
  letra: `
D                       A7
De nuevo estoy de vuelta,
                          D
después de larga ausencia;
                    G
igual que la calandria
     Gm                 D
que azota el vendaval.
                    A7
Y traigo mil canciones
                 D
como leñita seca:
                 Em
recuerdo de fogones
       A7              D
que invitan a matear.

             A7
Y divisé tu rancho
             D
a orillas del camino;
             G
adonde los jazmines
   Gm        D
tejieron un altar.
             A7
Al pie del calicanto,
                    D
la luna cuando pasa
             Em
peinó mi serenata
     A7              D
la cresta del sauzal.

ESTRIBILLO
                       F#
Tu amor es una estrella
                       Bm
con cuerdas de guitarra:
                        A7
una luz que me alumbra
             D
en mi oscuridad.
                 A7
Acércate a la reja;
                           D
sos la dueña de mi alma;
                 Em
sos mi luna cautiva
         A7             D
que me besa y se va.
(bis)

SEGUNDA
                     A7
Escucha que mis grillos
                        D
están enamorados;
            G
que llora mi guitarra,
Gm          D
sollozo del sauzal;
            A7
el tintinear de espuelas
         D
del río allá en el vado
         Em
y una noche serena,
     A7              D
prendida en mi cantar.

                     A7
De nuevo estoy de vuelta;
                        D
mi tropa está en la huella:
            G
arrieros musiqueros
Gm          D
me ayudan a llegar.
            A7
Tuve que hacer un alto
         D
por un toro mañero,
         Em
allá en el calicanto,
     A7              D
a orillas del sauzal.

ESTRIBILLO
                  F#
Tu amor es una estrella
                     Bm
con cuerdas de guitarra:
                     A7
una luz que me alumbra
         D
en mi oscuridad.
         A7
Acércate a la reja;
                        D
sos la dueña de mi alma;
            Em
sos mi luna cautiva
     A7              D
que me besa y se va.
(bis)
`
},

{
  titulo: "Agitando pañuelos",
  ritmo: "Zamba",
  tono: "F#m",
  miTono: "F#m",
  letra: `
Intro: F#m F#7 Bm E7 A C#7 · F#m E D C#7 Bm A C#7 F#m

F#m F#7 Bm      E7                         A                       C#7
Te vi, no olvidaré... un carnaval, guitarra, bombo y violín
F#m E D     C#7 Bm              A C#7 F#m
agitando pañuelos te vi cadencia al bailar, airoso el perfil.
F#m E D         C#7 Bm          A C#7 F#m
agitando pañuelos te vi cadencia al bailar, airoso el perfil.

F#m F#7     Bm              E7                                  A       C#7
Me fui diciendo adiós y en ese adiós quedó enredado un querer.
F#m E D         C#7 Bm A                   C#7                       F#m
Agitando pañuelos me fui ¡Qué lindo añorar tu zamba de ayer!...
F#m E D         C#7 Bm A                   C#7                       F#m
Agitando pañuelos me fui ¡Qué lindo añorar tu zamba de ayer!...

ESTRIBILLO
F#m F#7 Bm                 E7                                A       C#7
Yo me iré, tú vendrás... Yo te llevaré, mi rancho se alegrará.
F#m E D         C#7 Bm A C#7 F#m
Agitando pañuelos me iré y en mí vivirá aquel carnaval.
F#m E D         C#7 Bm             A                         C#7 F#m
Agitando pañuelos me iré cantando esta zamba repiqueteadita.

SEGUNDA
Intro: F#m F#7 Bm E7 A C#7 · F#m E D C#7 Bm A C#7 F#m

F#m F#7 Bm                 E7                                A          C#7
Volví y te encontré... toda mi voz le dio a la copla un cantar.
F#m E D         C#7 Bm A              C#7                          F#m
Agitando pañuelos volví, sintiendo también mi pecho agitar.
F#m E D         C#7 Bm          A     C#7 F#m
Agitando pañuelos volví, sintiendo también mi pecho agitar.

F#m F#7 Bm          E7                        A                         C#7
Bailé hasta el final... engualichao, bailé hasta el amanecer.
F#m E D         C#7 Bm A              C#7                       F#m
Agitando pañuelos bailé. ¡Qué lindo bailar las zambas de ayer!
F#m E D         C#7 Bm A              C#7                       F#m
Agitando pañuelos bailé. ¡Qué lindo bailar las zambas de ayer!

ESTRIBILLO
F#m F#7 Bm                 E7                                A       C#7
Yo me iré, tú vendrás... Yo te llevaré, mi rancho se alegrará.
F#m E D         C#7 Bm A C#7 F#m
Agitando pañuelos me iré y en mí vivirá aquel carnaval.
F#m E D         C#7 Bm             A                         C#7 F#m
Agitando pañuelos me iré cantando esta zamba repiqueteadita.
`
},

{
  titulo: "Desde el puente carretero",
  ritmo: "Chacarera",
  tono: "G",
  miTono: "G",
  letra: `
Intro con melodía de violín: G G D G (x2)

G7       C
Si pasás por mi provincia
         G
con tu familia viajero
         D
verás qué lindo es el río
         G
desde el Puente Carretero.

Melodía violín: G G D G (x2)

G7       C
Es cuna de mil recuerdos
         G
de amores y de nostalgias
         D
corazón entrelazado
         G
entre Santiago y La Banda.

Melodía violín: G G D G (x2)

G7       C
Será el Puente Carretero
         G
que va cortando caminos
         D
para llegar a los brazos
         G
donde me espera un cariño.

ESTRIBILLO
G7       C
Encontrarás en mi tierra
         G
cantores de salamanca
         D
para que nunca te olvides
         G
aromas a Santiago manta.

SEGUNDA
G7     C
Por nada olvides viajero
         G
lo que sienten mis paisanos
         D
seguro te han de querer
         G
como se quiere a un hermano.

Melodía violín: G G D G (x2)

G7  C
Y cuando llega la noche
    G
te pasás mirando el río
    D
seguro que algún dorado
    G
se besa con el rocío.

Melodía violín: G G D G (x2)

G7  C
Coplitas que van naciendo
    G
de mi corazón travieso
    D
me hacen cosquillas en el alma
    G
cuando se agranda el silencio.

ESTRIBILLO
G7  C
Encontrarás en mi tierra
       G
cantores de salamanca
       D
para que nunca te olvides
       G
aromas a Santiago manta.
`
},

{
  titulo: "Campo afuera",
  ritmo: "Chacarera",
  tono: "Em",
  miTono: "Em",
  letra: `
Intro: B7 Em B7 Em B7 Em B7 Em

Em     C F#7                 B7
Hace tiempo y buscando por ahí una chacarera
Am D7 G                 C
allá en los montes que hay en mi pago
B7 Em
campo afuera.

       B7 Em                         B7
Campo de la rudita monte adentro'e Tulumba
       Em               Am D7 G C
la he de encontrar linda su bata de percal
   B7            Em
baila Doña Dominga la chacarera.

Em             C F#7             B7
Abajito de un tala la vi por ser montaraza
Am D7 G C
y unos tizones de leña mansa
B7 Em
la aromaban.

       B7 Em                 B7
La aromaban con su olor unos gajos de tala
       Em            Am D7               G C
que supo cortar mi amigo Don Vivas al caer
   B7            Em
el invierno pasado para su corral.

Em             C F#7             B7
Y en la tierrita suelta al barrer de las alpargatas
Am     D7 G C
dentro'e los montes subió la luna
B7 Em
pa' alumbrarla.

ESTRIBILLO
D      Em            D       Em
Como nube en el aire quedó el polvaderal
Am D7 G C
ojito'i tala flecos de luna
B7 Em
la chacarera.

SEGUNDA
Em               C           F#7      B7
Con su bata de puro percal va Doña Dominga
Am D7 G C
todas las flores que hay en el monte
B7 Em
se la envidian.

       B7 Em                 B7
Se la envidian porque no hay un color más hermoso
       Em          Am D7 G                 C
que el de su percal, ni moza que sepa regalar
   B7                        Em
el donaire que tiene su buen zarandear.

Em              C F#7            B7
Y las niñas quisieran bailar como lo hace ella
Am D7 G C
la trenza al viento y una manito en
B7 Em
la cadera.

       B7 Em                         B7
Su cadera es un vaivén parecido al del sauce
       Em Am                 D7 G C
y al mimbre también, esa es mi abuela se saben decir
   B7            Em
los changos del monte cuantito la ven.

Em              C F#7            B7
Si a los sesenta la baila así lo que ha sido en antes
Am D7 G C
una corzuela lujosa de ágil
B7 Em
deje nomás.

ESTRIBILLO
D           Em       D           Em
Como nube en el aire quedó el polvaderal
Am D7 G C
ojito'i tala flecos de luna
B7 Em
la chacarera.
`
},

{
  titulo: "Zamba para un bohemio guitarrero",
  ritmo: "Zamba",
  tono: "Am",
  miTono: "Am",
  letra: `
Am            Dm
Ovillado por el vino
G7            C
tu canto eriza la noche.
E                 C
Y al escuadrón guitarrero tu voz
A7               Dm
con el lucero lo esconde.
E                 F
Y al escuadrón guitarrero tu voz
    E            Am
con el lucero lo esconde.

Am            Dm
Guitarrero enamorado
G7            C
abrazao con la pobreza
E                 C
mira del cielo llorando el ayer
A7               Dm
las estrellas con tristeza.
E                 F
mira del cielo llorando el ayer
    E            Am
las estrellas con tristeza.

ESTRIBILLO
G7                C
Solito como la urpila
       C7                 F
Coquito Cáceres canta
E                                F
canta pechando las penas su voz
           E                 Am
de su bohemia atormentada.
E                                F
canta pechando las penas su voz
           E                 Am
de su bohemia atormentada.

INSTRUMENTAL ZAMBA

SEGUNDA
Am                Dm
Tu canto beben las calles
       G7              C
de mi pueblo santiagueño
E                 C
cuando el silencio se hace soledad
A7               Dm
y la noche ata el sueño.
E                            F
cuando el silencio se hace soledad
    E                Am
y la noche ata el sueño.

Am           Dm
Madurando carnavales
    G7                 C
tu guitarra moja el alba
E            C
y en el remanso de tu corazón
A7           Dm
una chacarera baila.
E            F
y en el remanso de tu corazón
    E        Am
una chacarera baila.

ESTRIBILLO
G7           C
Solito como la urpila
        C7                F
Coquito Cáceres canta
E                                F
canta pechando las penas su voz
        E                    Am
de su bohemia atormentada.
E                                F
canta pechando las penas su voz
        E                    Am
de su bohemia atormentada.
`
},

{
  titulo: "Aquel tiempo de mi infancia",
  ritmo: "Escondido",
  tono: "Dm",
  miTono: "Dm",
  letra: `
Intro: Dm Gm A7 Dm (x2)

Dm              Gm            A7          Dm
Quiero volver aquel tiempo como quien mira hacia adentro
Bis: Dm Gm A7 Dm
Dm              Gm            A7          Dm
aquel tiempo de mi infancia de soles y de recuerdos
Bis: Dm Gm A7 Dm

    D7      Gm                 C           F/C
achalay qué linda vida volver a andar las distancias
    Dm/C        Dm/Bb             A7               Dm
caminar las calles viejas, sentir sus nuevas fragancias
Dm          Gm                 A7                  Dm
el viejo tren de mi pueblo es la esperanza que andaba
Bis: Dm Gm A7 Dm

        D7      Gm                C             F
yo era humito de mi gente, humito que se quemaba
    Dm/C Dm/Bb                    A7            Dm
como brasita en el fuego, como cigarrito en chala
    Dm      Gm          A7         Dm
y de soles y de lunas solito me fui criando
Bis: Dm Gm A7 Dm (se acaba)

    D7          Gm          C                 F
entre medio los cantores, florecido dentro el alma
    Dm/C Dm/Bb              A7                  Dm
primavera que llegaban en capullos y flores blancas

SEGUNDA
    Dm      Gm              A7                  Dm
Soy el fruto de la vida de dos ramas que se unieron
Bis: Dm Gm A7 Dm
    Dm          Gm                   A7             Dm
de dos ramas que a la tierra le dieron sus frutos nuevos
Bis: Dm Gm A7 Dm

        D7      Gm             C                F
y en el beso de mi madre subí a cabalgar mi sueño
    Dm/C Dm/Bb                    A7            Dm
en un mundo de ilusiones de música y canto lleno
    Dm          Gm                   A7         Dm
quise volverme en la noche soy tucu tucu y cigarra
Bis: Dm Gm A7 Dm

    D7      Gm              C                F
un corazón de vidala quise ser parche de caja
    Dm/C Dm/Bb                 A7               Dm
para que alegre mis penas en días o noches largas
    Dm      Gm          A7         Dm
y de soles y de lunas solito me fui criando
Bis: Dm Gm A7 Dm

    D7          Gm                   C              F
Santiago vuelvo a tu lado, quiero secar hoy mi llanto
    Dm/C        Dm/Bb             A7                Dm
dame la magia y la suerte, quiero ser de nuevo chango.
`
},

{
  titulo: "Dejame que me vaya",
  ritmo: "Chacarera",
  tono: "Am",
  miTono: "Am",
  letra: `
Intro: Am Am Dm E7 Am

Am
Aunque me duela el alma
Dm
y se me quiebre el pecho
Dm
dejame que me vaya
Am
a olvidarme tus besos
F
dejame que me vaya
Dm E7  Am
a olvidarme tus besos.

Am
A dónde iré no importa
Dm
no intentes detenerme
Dm
total sabés de sobra
Am
que en vano fue quererte.
F
total sabés de sobra
Dm E7  Am
que en vano fue quererte.

Am
No creo en tus promesas
Dm
no me hagas juramentos
Dm
ni bien tu voz lo suelta
Am
ya se los lleva el viento.
F
ni bien tu voz lo suelta
Dm E7  Am
ya se los lleva el viento.

ESTRIBILLO
Am
Siempre en el corazón
Dm
guardo una chacarera
Dm
dejame que me vaya
Am
y que con ella muera.
F
dejame que me vaya
Dm E7  Am
y que con ella muera.

SEGUNDA
Am
Aunque me duela el alma
Dm
tan solo pienso en irme
Dm
no quiero estar mañana
Am
crucificado y triste.
F
no quiero estar mañana
Dm E7  Am
crucificado y triste.

Am
Del hueco de tus manos
Dm
blancas como el azúcar
Dm
bebí los desengaños
Am
probé las amarguras.
F
bebí los desengaños
Dm E7  Am
probé las amarguras.

Am
La miel que vos me diste
Dm
no estaba hecha de flores
Dm
de algún rencor hiciste
Am
la miel de tus amores
F
de algún rencor hiciste
Dm E7  Am
la miel de tus amores.

ESTRIBILLO
Am
Siempre en el corazón
Dm
guardo una chacarera
Dm
dejame que me vaya
Am
y que con ella muera.
F
dejame que me vaya
Dm E7  Am
y que con ella muera.
`
},

{
  titulo: "Alma de rezabaile",
  ritmo: "Chacarera",
  tono: "Em",
  miTono: "Em",
  letra: `
Intro: G A G A

G A G A
El baile ya ha comenzado
G A G A
allá por Santiago del Estero
B7          Em
retumba toda la selva
B7          Em
el repicar de un bombo legüero.

G A G A
De fiesta toda la noche
G A G A
el dulce brillo de las estrellas
B7          Em
bailaba la Telesita
B7          Em
que era la danza, que era la reina.

G A G A
Nochecitas santiagueñas
G A G A
ardientes, puras noches de plata
B7          Em
la luna sobre del monte
B7          Em
en luz brillante se desparrama.

ESTRIBILLO
G A G A
Que baile la Telesita
G A G A
dulce y fragante como las flores
B7          Em
gritaba la paisanada
B7          Em
emborrachada de amores.

SEGUNDA
Inter: G A G A

G A G A
Qué busca la pobrecita
G A G A
tal vez la danza le dé un consuelo
B7          Em
tu pollera remolino
B7          Em
tus pies descalzos, trompo de fuego.

G A G A
Telesita, Telesita
G A G A
te has vuelto lluvia, te has vuelto luna,
B7          Em
te has vuelto flor de los campos
B7          Em
te has vuelto brisa que me perfuma.

G A G A
Han pasado muchos años
G A G A
pero tu pueblo nunca te olvida
B7          Em
bailando en los rezabailes
B7          Em
para que tu alma siga encendida

ESTRIBILLO
G A G A
Que baile la Telesita
G A G A
dulce y fragante como las flores
B7          Em
gritaba la paisanada
B7          Em
emborrachada de amores.
`
},

{
  titulo: "Zamba de amor en vuelo",
  ritmo: "Zamba",
  tono: "Am",
  miTono: "Am",
  letra: `
Intro: Dm Am E7 Am A7 · Dm Am E7 Am E7

Am
Como un tizón encendido
Dm
ardiendo dentro mi sangre
G7
tu sombra viene conmigo
C          A7
y no la puedo arrancar.
   Dm                Am
Te llevo por los caminos
                        E7
como un abrojo prendido,
       Am A7
prendido a mi caminar.
Dm     Am
Te llevo por los caminos
G F                     E7
como un abrojo prendido,
           Am
prendido a mi guitarrear.

Am
Por esas ramas del viento
Dm
veo anunciado tu pelo
G7
y en los alambres del tiempo
C          A7
jirones de soledad.
Dm         Am
Se deshilacha el recuerdo
           E7
sabiendo que estás muy lejos
       Am A7
y que ya no volverás.
Dm     Am
Se deshilacha el recuerdo
G F                     E7
sabiendo que estás muy lejos
                        Am
de aquella nuestra verdad.

ESTRIBILLO
G7     C A7 Dm
Estremecidos de cielo
       Am A7 Dm
yo vi tus ojos llorar.
       Am
La noche pide guitarra
       E7
la zamba busca el olvido
       Am A7 Dm
y yo te quiero cantar.
                   Am
La noche pide guitarra
   G F E7
la zamba busca el camino
               Am
yo no te puedo olvidar.

SEGUNDA
Intro: Dm Am E7 Am A7 · Dm Am E7 Am E7

Am
Como un sutil alfarero
Dm
te fui tallando en mis sueños
G7
a golpe de greda y fuego
C              A7
a fuerza de tanto amar.
Dm             Am
Y en el telar de un coplero
               E7
te dibujé verso a verso
         Am A7
para no perderte más.
Dm             Am
Y en el telar de un coplero
G F            E7
te dibujé verso a verso
               Am A7
para besarte al cantar.

Am
Aquella luna perdida
Dm
como un capullo en el cielo
G7
se me hace que es tu pañuelo
C              A7
que en una zamba se va.
Dm             Am
Y en el temblor del lucero
               E7
como siguiendo tu vuelo
         Am A7
mis pensamientos se van.
Dm             Am
Y en el temblor del lucero
   G F         E7
como siguiendo tu vuelo
         Am
mi amor, mi amor te sale a buscar.

ESTRIBILLO
G7     C A7 Dm
Estremecidos de cielo
       Am A7 Dm
yo vi tus ojos llorar.
       Am
La noche pide guitarra
       E7
la zamba busca el olvido
       Am A7 Dm
y yo te quiero cantar.
                   Am
La noche pide guitarra
   G F E7
la zamba busca el camino
               Am
yo no te puedo olvidar.
`
},

{
  titulo: "Balderrama",
  ritmo: "Zamba",
  tono: "Em",
  miTono: "Em",
  letra: `
Em             D
Orillitas del canal
D7                   G B7
cuando llega la mañana
Em                F#7
sale cantando la noche
B7                Em
desde lo del Balderrama
G                    A
sale cantando la noche
B7                Em
desde lo del Balderrama

Em             D
Adentro puro temblar
D7                   G B7
el bombo con la baguala
Em                F#7
y se alborota quemado
B7                Em
dele chispear la guitarra

ESTRIBILLO
Em     A
Lucero solito
D7 G B7
brote del alma
Em                F#7
¿Dónde iremos a parar
B7                   Em
si se apaga Balderrama?
G                 A
¿Dónde iremos a parar
B7                   Em
si se apaga Balderrama?

SEGUNDA
Intro: Em A G A G B7 Em

Em             D
Si uno se pone a cantar
D7                   G B7
un cochero lo acompaña
Em                F#7
y en cada vaso de vino
B7                Em
tiembla el lucero del alba

Em             D
Zamba del amanecer
D7                   G B7
arrullo de Balderrama
Em                F#7
llora por la medianoche
B7                Em
canta por la madrugada

ESTRIBILLO
Em  A
Lucero solito
D7 G B7
brote del alma
Em                F#7
¿Dónde iremos a parar
B7                   Em
si se apaga Balderrama?
G                 A
¿Dónde iremos a parar
B7                   Em
si se apaga Balderrama?
`
},

{
  titulo: "Chacarera para mi vuelta",
  ritmo: "Chacarera",
  tono: "F#m",
  miTono: "F#m",
  letra: `
Intro: C#7 F#m

F#m
Dejé mi tierra cantora
D
por conocer otros pagos
E
voy andando los caminos
C#7  F#m
pero mi alma está en Santiago.

F#m
Desde entonces vivo solo
D
por las calles de la vida
E
callada sombra que pasa
C#7  F#m
guitarra llena de heridas.

F#m
Guitarra llena de heridas
D
mate amargo mal cebado
E
tu llanto dentro del pecho
C#7         F#m
me anda llorando, llorando.

ESTRIBILLO
F#m
Cuando yo pegue la vuelta
D
no sé ni cómo ni cuándo
E
tierra madre he de contarte
C#7  F#m
lo mucho que te he añorado.

SEGUNDITA
Intro: F#m C#7

F#m
De tu distancia a la mía
D
hay una cruz de madera
E
una nostalgia de canto
C#7 F#m
y un bailar de chacarera.

F#m
Un bailar de chacareras
D
bajo este cielo estrellado
E
donde comulgan los bombos
C#7  F#m
con los vientos y el sachayoj.

F#m
Y al dormir baja la noche
D
sobre la espuma del río
E
en la sala de un ochogos
C#7  F#m
pa' no morirse de frío.

ESTRIBILLO
F#m
Cuando yo pegue la vuelta
D
no sé ni cómo ni cuándo
E
tierra madre he de contarte
C#7  F#m
lo mucho que te he añorado.
`
},

{
  titulo: "La sachapera",
  ritmo: "Chacarera",
  tono: "C",
  miTono: "C",
  letra: `
   C
Churita mi buena moza
         E7      Am
balanceando la pollera
   D7                  G
bailando es la más donosa
      D7         G
morenita santiagueña.
      F          C
Con la chacarera doble
         G7         C
se curan todas las penas.

C
Dulce fruto de mis pagos
   E7        Am
criollita sabagastera
   D7                  G
boquita de arrope y tuna
   D7                  G
juguito de sachapera.
      F          C
Con la chacarera doble
         G7         C
se curan todas las penas.

C
Da gusto andar por los montes
E7           Am
cuando la noche despierta
   D7                  G
besando los algarrobos
   D7                  G
con su llovizna de estrellas.
      F          C
Con la chacarera doble
         G7         C
se curan todas las penas.

ESTRIBILLO
C
En Santiago del Estero
E7               Am
la Salamanca me espera
   D7                  G
y el sonko dejarte quiero
   D7                  G
para cantarle a mi tierra.
      F          C
Con la chacarera doble
      G7            C
se curan todas las penas.

SEGUNDA
   C
Bienhaiga mi buena moza
         E7  Am
has encendido una hoguera
   D7              G
con el fuego de tus ojos
   D7              G
es mi amor leñita seca.
   F         C
Con la chacarera doble
         G7     C
se curan todas las penas.

   C
Pal' tiempo de la arropiada
         E7  Am
hay una luna hechicera
   D7              G
que en medio de las vidalas
      D7     G
cantando coplas se queda.
      F      C
Con la chacarera doble
      G7        C
se curan todas las penas.

C
Con harina de algarroba
         E7  Am
voy a endulzar las tristezas
D7              G
que por andar en amores
D7              G
me van siguiendo de cerca.
   F         C
Con la chacarera doble
      G7        C
se curan todas las penas.

ESTRIBILLO
   C
En Santiago del Estero
E7           Am
la Salamanca me espera
   D7              G
y el sonko dejarte quiero
   D7              G
para cantarle a mi tierra.
      F      C
Con la chacarera doble
      G7        C
se curan todas las penas.
`
},

{
  titulo: "Santiago, chango moreno",
  ritmo: "Chacarera",
  tono: "G",
  miTono: "E",
  letra: `
G
En cada chacarera,
C
yo estoy volviendo al pago.
Am
Y soy bombo latiendo,
D7
si te pienso Santiago.
C
En cada chacarera,
D7                  G
estoy volviendo al pago.

G
Crespín soy cuando siento,
C
Santiago que te nombran.
Am
Y el diablo de la Macha,
D7
el corazón me ronda.
C
Crespín soy cuando siento,
D7                  G
Santiago que te nombran.

G
Cuando escucho a dos cajas,
C
golpear una vidala.
Am
Un coyuyo de ausencia,
D7
se prende a mi garganta.
C
Cuando escucho a dos cajas,
D7                  G
golpear una vidala.

ESTRIBILLO
G
Santiago del Estero,
C
es un chango moreno.
Am
Con música en los ojos,
D7
y un corazón coplero.
C
Santiago del Estero,
D7                  G
es un chango moreno.

SEGUNDA
G
Chilalo, piel morena,
C
bombisto y vidalero.
Am
Cantor de chacareras,
D7
¡claro! soy santiagueño.
C
Chilalo, piel morena,
D7                  G
bombisto y vidalero.

G
Lejos del pago añoro,
C
las noches santiagueñas.
Am
Y ese parral por cielo,
D7
con racimo de estrellas.
C
Lejos del pago añoro,
D7                  G
las noches santiagueñas.

G
Andar es mi destino,
C
llamen pagos ajenos.
Am
Pero a mi santiagueña,
D7
Mishkila siempre vuelvo.
C
Andar es mi destino,
D7                  G
llamen pagos ajenos.

ESTRIBILLO
G
Santiago del Estero,
C
es un chango moreno.
Am
Con música en los ojos,
D7
y un corazón coplero.
C
Santiago del Estero,
D7                  G
es un chango moreno.
`
},

];
