export const initialData = {
  theme: {
    defaultMode: "dark",
    accentPrimary: "#D4A359",
    accentSecondary: "#7A9A82",
    darkBgPrimary: "#0B0E0C",
    darkBgSecondary: "#121614",
    darkTextPrimary: "#F4F1EA",
    darkTextSecondary: "#9CA39E",
    lightBgPrimary: "#F6F3EC",
    lightBgSecondary: "#FFFFFF",
    lightTextPrimary: "#181D1A",
    lightTextSecondary: "#5A655E",
    fontSerif: "Cormorant Garamond",
    fontSans: "Plus Jakarta Sans",
    fontMono: "JetBrains Mono"
  },
  profile: {
    brand: "Wolkenrose - Fotografie",
    name: "Petra Schemmel",
    tagline: "Poetische Natur-, Wolken- & Landschaftsfotografie",
    bio: "Unter dem Namen ‚Wolkenrose‘ widme ich mich den stillen Momenten der Natur: dramatischen Wolkenformationen über alpinen Gipfeln, nebelverhangenen Urwäldern, goldenen Morgenstunden im Moor und der unberührten Wildnis des Nordens. Jede Aufnahme ist eine Einladung zum Innehalten.",
    location: "Voralpenland & Unterwegs · 47.7267° N, 11.8606° O",
    portraitImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85",
    equipmentTitle: "Kameraausrüstung & Objektive",
    equipmentIntro: "Meine Ausrüstung ist auf feinste Tonwertabstufungen, hohe Detailauflösung und extreme Witterungsbedingungen in den Bergen und im hohen Norden ausgelegt.",
    printsSubtitle: "Fine-Art-Editionen & Manufaktur",
    printsTitle: "Handsignierte Kunstdrucke aus dem Atelier Wolkenrose",
    printsText: "Alle Werke der Galerie sind als handsignierte, limitierte Fine-Art-Pigmentdrucke auf 315g Hahnemühle Photo Rag Baryta Büttenpapier erhältlich. Ein Teil jedes Verkaufs fließt in den Schutz heimischer Moore und alter Waldbestände.",
    contactIntro: "Du interessierst dich für einen handsignierten Fine-Art-Kunstdruck, eine Ausstellung oder möchtest dich über Naturfotografie austauschen? Ich freue mich über deine Nachricht oder deinen Besuch auf meinen Social-Media-Kanälen.",
    email: "atelier@wolkenrose-fotografie.de",
    phone: "+49 (0) 8022 / 948 210",
    instagram: "@wolkenrose.petraschemmel",
    socials: {
      instagramUrl: "https://instagram.com/wolkenrose.petraschemmel",
      instagramHandle: "@wolkenrose.petraschemmel",
      blueskyUrl: "https://bsky.app/profile/wolkenrose.bsky.social",
      blueskyHandle: "@wolkenrose.bsky.social",
      youtubeUrl: "",
      youtubeHandle: "",
      pinterestUrl: "",
      pinterestHandle: ""
    },
    equipment: [
      "Hasselblad X2D 100C Mittelformat",
      "Sony Alpha 1 II",
      "XCD 2,5/38V & XCD 2,5/90V",
      "FE 400mm f/2.8 GM OSS",
      "Gitzo Systematic Carbon-Stativ"
    ],
    stats: {
      expeditions: 48,
      countries: 19,
      publications: 24,
      conservationGrants: 9
    }
  },
  photos: [
    {
      id: "photo-1",
      title: "Morgenstille am Vestrahorn",
      category: "Alpen & Gletscher",
      location: "Stokksnes-Halbinsel, Island",
      coordinates: "64.2442° N, 14.9642° W",
      dateTaken: "2026-02-14",
      featured: true,
      landingSelected: true,
      aspectRatio: "landscape",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85",
      story: "Nach vier Tagen Sturm riss die Wolkendecke bei Sonnenaufgang für genau zwölf Minuten auf. Die schwarzen Vulkandünen spiegelten das erste bernsteinfarbene Licht, das die steilen Felswände streifte.",
      exif: {
        camera: "Hasselblad X2D 100C",
        lens: "XCD 2,5/38V",
        focalLength: "38mm",
        aperture: "f/11",
        shutterSpeed: "1/4s",
        iso: "64"
      }
    },
    {
      id: "photo-2",
      title: "Kathedrale des alten Waldes",
      category: "Wälder & Moore",
      location: "Bayerischer Wald, Deutschland",
      coordinates: "48.9667° N, 13.3944° O",
      dateTaken: "2026-01-22",
      featured: true,
      landingSelected: true,
      aspectRatio: "portrait",
      imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
      story: "Dichter Frühnebel zog lautlos durch die jahrhundertealten Baumriesen. Als die Morgensonne das Kronendach durchbrach, zeichneten einzelne goldene Lichtstrahlen feine Konturen auf den moosbedeckten Waldboden.",
      exif: {
        camera: "Hasselblad X2D 100C",
        lens: "XCD 2,5/55V",
        focalLength: "55mm",
        aperture: "f/8",
        shutterSpeed: "1/30s",
        iso: "100"
      }
    },
    {
      id: "photo-3",
      title: "Smaragdlicht über den Fjorden",
      category: "Nachthimmel & Polarlicht",
      location: "Reinebringen, Lofoten, Norwegen",
      coordinates: "67.9309° N, 13.0836° O",
      dateTaken: "2026-03-03",
      featured: true,
      landingSelected: true,
      aspectRatio: "landscape",
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85",
      story: "Bei eisigen Minusgraden auf 600 Metern Höhe tanzten plötzlich smaragdgrüne und violette Polarlichtbänder über den schroffen Granitgipfeln und spiegelten sich im stillen Nordmeer.",
      exif: {
        camera: "Sony Alpha 1",
        lens: "FE 14mm f/1.8 GM",
        focalLength: "14mm",
        aperture: "f/1.8",
        shutterSpeed: "4s",
        iso: "1600"
      }
    },
    {
      id: "photo-4",
      title: "Wächter der Wintertaiga",
      category: "Wildtiere",
      location: "Kuhmo Wildnis, Finnland",
      coordinates: "64.1277° N, 29.5141° O",
      dateTaken: "2025-11-18",
      featured: false,
      landingSelected: true,
      aspectRatio: "portrait",
      imageUrl: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1400&q=85",
      story: "Aus einer eingeschneiten Tarnhütte nach vielen Stunden geduldigen Wartens im ersten strengen Frost aufgenommen. Ein wilder Rotfuchs hielt auf einer schneebedeckten Kuppe inne und lauschte in die Stille.",
      exif: {
        camera: "Sony Alpha 1",
        lens: "FE 400mm f/2.8 GM",
        focalLength: "400mm",
        aperture: "f/2.8",
        shutterSpeed: "1/1600s",
        iso: "640"
      }
    },
    {
      id: "photo-5",
      title: "Wolkenrose am Hochgrat",
      category: "Wolken & Strukturen",
      location: "Allgäuer Hochalpen, Bayern",
      coordinates: "47.4950° N, 10.0680° O",
      dateTaken: "2025-10-09",
      featured: true,
      landingSelected: true,
      aspectRatio: "landscape",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85",
      story: "Der namensgebende Moment für mein Projekt: Nach einem Herbstgewitter formten die aufsteigenden Nebelschwaden eine zarte Wolkenrose rund um den ersten schneebedeckten Grat im Abendlicht.",
      exif: {
        camera: "Hasselblad X2D 100C",
        lens: "XCD 2,5/90V",
        focalLength: "90mm",
        aperture: "f/5.6",
        shutterSpeed: "1/1000s",
        iso: "200"
      }
    },
    {
      id: "photo-6",
      title: "Basaltküste in der Winterdünung",
      category: "Küsten & Meere",
      location: "Reynisfjara Küste, Südisland",
      coordinates: "63.4042° N, 19.0450° W",
      dateTaken: "2026-01-05",
      featured: false,
      landingSelected: true,
      aspectRatio: "landscape",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
      story: "Mit einem Neutraldichtefilter belichtet, während die zurückweichende Atlantikwelle feine weiße Gischtlinien über den schwarzen Lavastrand zeichnete.",
      exif: {
        camera: "Hasselblad X2D 100C",
        lens: "XCD 4/21",
        focalLength: "21mm",
        aperture: "f/14",
        shutterSpeed: "2.5s",
        iso: "64"
      }
    },
    {
      id: "photo-7",
      title: "Alpenglühen über der Seceda",
      category: "Alpen & Gletscher",
      location: "Grödnertal, Südtirol",
      coordinates: "46.6011° N, 11.7258° O",
      dateTaken: "2025-09-24",
      featured: true,
      landingSelected: false,
      aspectRatio: "landscape",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=85",
      story: "Tiefe Herbstwolken schmiegten sich in die Südtiroler Täler, während die markanten Geislerspitzen das letzte purpurrote Licht der Abendsonne einfingen.",
      exif: {
        camera: "Hasselblad X2D 100C",
        lens: "XCD 2,5/55V",
        focalLength: "55mm",
        aperture: "f/9",
        shutterSpeed: "1/60s",
        iso: "100"
      }
    },
    {
      id: "photo-8",
      title: "Nebelschleier am Bergsee",
      category: "Wälder & Moore",
      location: "Berchtesgadener Land, Deutschland",
      coordinates: "47.5517° N, 12.9780° O",
      dateTaken: "2025-08-19",
      featured: false,
      landingSelected: false,
      aspectRatio: "portrait",
      imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=85",
      story: "Um 5:15 Uhr morgens lag der Gebirgssee vollkommen spiegelglatt im Tal. Alte Lärchen und bemooste Felsen rahmten den rauschenden Wasserfall im ersten Dämmerlicht.",
      exif: {
        camera: "Sony Alpha 1",
        lens: "FE 24-70mm f/2.8 GM II",
        focalLength: "35mm",
        aperture: "f/11",
        shutterSpeed: "1/8s",
        iso: "100"
      }
    }
  ],
  posts: [
    {
      id: "post-1",
      title: "Wenn Wolken Rosen blühen lassen: Drei Wochen zwischen Gletschern und Gipfeln",
      subtitle: "Wie wechselhafte Winterstürme, das geduldige Warten auf das erste Morgenlicht und die Stille der Berge meine neue Fotoserie geprägt haben.",
      category: "Reisetagebuch",
      location: "Alpenhauptkamm & Island",
      publishedAt: "2026-03-10",
      featured: true,
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85",
      tags: ["Wolkenrose", "Gletscher", "Mittelformat", "Lichtstimmung"],
      blocks: [
        {
          id: "b1",
          type: "paragraph",
          content: "Das Hochgebirge besitzt im Spätwinter einen ganz eigenen Klang. Noch bevor das erste kühle Blau der Morgendämmerung den Horizont berührt, hört man nur das leise Knirschen des Firnschnees unter den Steigeisen und den Wind, der über die Grate streicht. Jeder Atemzug gefriert in der klaren Höhenluft."
        },
        {
          id: "b2",
          type: "quote",
          content: "Wer Wolken und Licht fotografiert, fotografiert die Vergänglichkeit selbst – kein einziger Himmel wiederholt sich jemals auf dieselbe Weise.",
          author: "Petra Schemmel — Tagebuchnotiz #14, Wolkenrose"
        },
        {
          id: "b3",
          type: "heading",
          content: "Die Kunst des geduldigen Wartens"
        },
        {
          id: "b4",
          type: "paragraph",
          content: "Oft sind es genau die Tage, an denen die Wettervorhersage dichten Nebel oder abziehende Schauer meldet, die uns die berührendsten Bilder schenken. Wenn sich die feuchte Luft an den steilen Bergflanken hebt und die ersten Sonnenstrahlen schräg durch die Wolkenlücken brechen, entsteht jenes zarte Leuchten, das mich zum Namen ‚Wolkenrose‘ inspiriert hat."
        },
        {
          id: "b5",
          type: "image",
          imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85",
          caption: "Nach einem dreitägigen Schneesturm klarte der Himmel um Mitternacht auf und gab den Blick auf das Polarlicht frei.",
          exifNote: "Hasselblad X2D 100C · 21mm · f/4 · 6s · ISO 800"
        },
        {
          id: "b6",
          type: "paragraph",
          content: "Das Arbeiten mit einer Mittelformatkamera bei zweistelligen Minusgraden erfordert Ruhe und Sorgfalt. Ersatzakkus trage ich dicht am Körper in den Innentaschen meiner Wolljacke, damit sie in der Kälte nicht an Spannung verlieren. Genauso wichtig ist es, sich vor Ort Zeit zu nehmen: das Stativ sorgfältig auszurichten, den Bildausschnitt bewusst zu wählen und erst dann auszulösen, wenn Licht und Wolken im Einklang stehen."
        },
        {
          id: "b7",
          type: "image",
          imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
          caption: "Das erste goldene Streiflicht berührt die verschneiten Flanken über dem Nebelmeer.",
          exifNote: "XCD 90mm · f/8 · 1/250s · ISO 64"
        },
        {
          id: "b8",
          type: "paragraph",
          content: "Mit jedem Jahr, in dem ich an meine vertrauten Plätze in den Alpen und im hohen Norden zurückkehre, wird mir bewusster, wie kostbar diese unberührten Landschaften sind. Meine Fotografien sollen nicht nur ästhetische Wandbilder sein, sondern auch eine liebevolle Erinnerung daran, was es zu bewahren gilt."
        }
      ]
    },
    {
      id: "post-2",
      title: "Die Poesie der Stille: Wildtiere im ersten Winterfrost fotografieren",
      subtitle: "Erfahrungen aus über hundert Stunden im Ansitz zwischen verschneiten Mooren und nordischen Wäldern.",
      category: "Hinter der Kamera",
      location: "Nordische Taiga & Bayerischer Wald",
      publishedAt: "2026-02-02",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1800&q=85",
      tags: ["Wildtiere", "Winter", "Teleobjektiv", "Achtsamkeit"],
      blocks: [
        {
          id: "b201",
          type: "paragraph",
          content: "Respektvolle Wildtierfotografie beginnt lange bevor der Finger den Auslöser berührt. Sie beginnt mit dem Wunsch, selbst Teil der Stille zu werden. Sobald ein Tier unsere Anwesenheit als Störung wahrnimmt, geht der Zauber des unbeschwerten Augenblicks verloren."
        },
        {
          id: "b202",
          type: "heading",
          content: "Lautloser Verschluss und der richtige Wind"
        },
        {
          id: "b203",
          type: "paragraph",
          content: "Der Wechsel zum vollkommen lautlosen elektronischen Verschluss hat meine Arbeit in der Natur grundlegend verändert. In der klirrenden Kälte eines windstillen Wintermorgens trägt sonst jedes noch so leise Klicken über Dutzende Meter weit."
        },
        {
          id: "b204",
          type: "image",
          imageUrl: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1600&q=85",
          caption: "Ein Rotfuchs hält in der blauen Stunde im Pulverschnee inne – völlig ungestört.",
          exifNote: "Sony Alpha 1 · 400mm f/2.8 GM · f/2.8 · 1/1600s · ISO 640"
        },
        {
          id: "b205",
          type: "quote",
          content: "Geduld in der Naturfotografie ist kein passives Warten – sie ist ein waches Lauschen auf den Rhythmus des Waldes.",
          author: "Petra Schemmel"
        }
      ]
    },
    {
      id: "post-3",
      title: "Vom Sensor aufs Büttenpapier: Warum ich meine Werke als Fine-Art-Drucke gestalte",
      subtitle: "Feinste Tonwertabstufungen, 16-Bit-Farbtiefe und die Entschleunigung beim Fotografieren vom Stativ.",
      category: "Ausrüstung & Technik",
      location: "Atelier Wolkenrose · Oberbayern",
      publishedAt: "2026-01-12",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=85",
      tags: ["Fine Art Print", "Farbgestaltung", "Komposition", "Atelier"],
      blocks: [
        {
          id: "b301",
          type: "paragraph",
          content: "Eine Fotografie ist für mich erst dann wirklich vollendet, wenn man sie auf schwerem, mattem Baumwollpapier in den Händen hält. Besonders in zarten Nebelschleiern und den weichen Übergängen einer Abenddämmerung zeigt sich, wie viel Tiefe und Ruhe in einer sorgfältig ausgearbeiteten Aufnahme steckt."
        },
        {
          id: "b302",
          type: "image",
          imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85",
          caption: "Feine Lichtzeichnung in den Sonnenstrahlen eines nebligen Waldmorgens.",
          exifNote: "Hasselblad X2D 100C · 55mm · f/8 · 1/30s · ISO 100"
        },
        {
          id: "b303",
          type: "paragraph",
          content: "Noch wichtiger als die Technik ist jedoch die innere Haltung: Wer mit Bedacht komponiert und dreißig Minuten wartet, bis der Schatten einer einzelnen Wolke genau über den Bergrücken gleitet, erlebt die Landschaft mit einer ganz anderen Intensität."
        }
      ]
    },
    {
      id: "post-4",
      title: "Morgennebel im Hochmoor: Die verborgene Welt vor unserer Haustür",
      subtitle: "Warum man für magische Naturmomente nicht immer in die Ferne reisen muss – ein Herbstmorgen im bayerischen Voralpenland.",
      category: "Naturschutz",
      location: "Murnauer Moos, Oberbayern",
      publishedAt: "2025-11-28",
      featured: false,
      coverImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1800&q=85",
      tags: ["Hochmoor", "Oberbayern", "Herbstnebel", "Naturschutz"],
      blocks: [
        {
          id: "b401",
          type: "paragraph",
          content: "Intakte Moore gehören zu den wichtigsten und zugleich empfindlichsten Lebensräumen Mitteleuropas. Wenn sich im Spätherbst der erste Bodenfrost über die Torfmoose und Birken legt, verwandelt sich die weite Ebene vor den Alpen in ein stilles Lichtkunstwerk."
        },
        {
          id: "b402",
          type: "image",
          imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1600&q=85",
          caption: "Stilles Wasser und bemooste Ufer im ersten Dämmerlicht.",
          exifNote: "Sony Alpha 1 · 35mm · f/11 · 1/8s · ISO 100"
        },
        {
          id: "b403",
          type: "paragraph",
          content: "Auf den hölzernen Bohlenwegen bewege ich mich vor Sonnenaufgang besonders leise, um weder die rastenden Zugvögel noch das feine Gleichgewicht dieses einzigartigen Ökosystems zu stören."
        }
      ]
    }
  ]
};
