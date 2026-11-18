/*
  ALL THE WRITING ON THE SITE LIVES HERE.
  Every passage below is a starter draft — replace it with your own words.
  Keep the quotes (") and commas exactly as they are around each piece of text.
*/

const CONTENT = {
  byline: "An interactive retelling and reflection by Christian Angelo",

  // The opening line on the first page. Click it on the site to switch languages.
  openingFrench: "Aujourd'hui, maman est morte.",
  openingEnglish: "Today, Maman died.",

     // The opening paragraph is split in two: the left half, then the right half (sits lower, on the right)
  intro:
    "I started this book after finding it on the Internet Archive. The local stores around me never seemed to " +
    "have a copy, so I read it on my phone: on the bus, late at night, in the hours I should have been studying. " +
    "Right before the final chapter of Part Two, a paperback finally arrived, a gift from a special soul, and I " +
    "restarted the journey.",

  introRight:
    "Early on, I recognized more of myself in Meursault than I expected to. By the end, I understood him like " +
    "a friend. Nothing in the story is hidden. A man buries his mother, goes swimming, gets a girlfriend, fires " +
    "a gun on a beach, and is sentenced to death. Camus tells it flatly, the way the sun tells the truth: by " +
    "making everything too bright to look at. This site follows the heat. Scroll slowly.",

  // Part One: the sun climbs. "heat" is the temperature shown on the side gauge (°C).
  // "happens" is the plain plot summary hidden behind each chapter's "What happens" button.
  partOne: [
    {
      title: "The vigil",
      happens:
        "Meursault gets a telegram: his mother has died at the old people's home in Marengo. He takes the bus there, " +
        "sits up all night beside her coffin with the caretaker and her elderly friends, and walks in the funeral " +
        "procession under a burning sun.",
      place: "Marengo, 80 km from Algiers",
      heat: 26,
      text:
        "I saw a man disconnected from the one who gave birth to him. It wasn't strange to me that he didn't cry, " +
        "especially in front of people who never made him feel wanted, or seen, or cared for. The coffee and the " +
        "cigarette read to me as suppression, and also as his only chance at human connection, shared with the " +
        "home's caretaker. I understood him for not asking for pity, and instead accepting fate. His mind, too, wandered, " +
        "serving as a distraction from the present."
    },
    {
      title: "The sea",
      happens:
        "The next day he goes swimming and runs into Marie, a typist who used to work at his office. They see a comedy " +
        "film that night and start seeing each other. When she asks if he loves her, he says it doesn't mean anything, " +
        "but probably not.",
      place: "The harbour baths, Algiers",
      heat: 28,
      text:
        "I think Marie is good for Meursault. As an empath, I felt for her, though not deeply; she was moving fast " +
        "for two people who had only just reconnected. When he tells her love means nothing, I read it as honesty, " +
        "to himself and to her. He was unable to truly feel, and his answer reflected that. The swim and the movie " +
        "didn't bother me. I think he was doing his best to stay present instead of sulking, choosing things that " +
        "made him feel alive after such a tragedy. I see it as something written into us, what Camus called " +
        "living with the absurd: when life offers no meaning, we fill it with motion."
    },
    {
      title: "Raymond",
      happens:
        "His neighbour Raymond, a man with a bad reputation, invites him to dinner. Raymond believes his girlfriend " +
        "cheated on him and asks Meursault to write a letter luring her back so he can punish her. Meursault writes it, " +
        "and later agrees to vouch for Raymond with the police after he beats her.",
      place: "The landing, rue de Lyon",
      heat: 30,
      text:
        "Raymond, his neighbour, doesn't arrive as a villain. He arrives with wine and blood sausage, and a lonely man says yes. " +
        "I've always believed, as [[bourdain|Anthony Bourdain]] did, that sharing a meal is where comfort begins, that a table " +
        "can hold what two people can't say. Meursault never says much. But he stays, and he eats, and for a moment " +
        "he is wanted. When Raymond asks him to write a letter luring back his ex-girlfriend so he can punish her, he " +
        "writes it the way he does everything, without weight, as if the words would stay on the page and go no further. When Raymond calls him a pal, nothing in him stirs, and " +
        "nothing in him objects. It isn't much of a friendship. But for a man who asks so little of the world, it's " +
        "enough to join someone for Sunday lunch by the sea."
    },
    {
      title: "The beach",
      place: "A cabin by the sea, Sunday",
      heat: 34,
      text:
        "Everything I loved about Sunday lunch burns away in the next few pages. Move your shade slowly. The light " +
        "won't make it easy.",

      // The beach unfolds in four frames. Each one is hotter, and your shade gets smaller.
      // "note" is your own short reaction, shown in italics under the frame. Leave it as "" to show nothing.
      frames: [
        {
          title: "The walk",
          heat: 34,
          text:
            "The three men walk along the sand. The sun beats down on the sea and on the beach. At the far end, two men " +
            "are waiting. One of them is the brother of Raymond's ex-girlfriend, the woman Meursault's letter lured back " +
            "so Raymond could punish her. Words, then fists. A knife flashes, and Raymond's arm and mouth are cut. The " +
            "strangers back away slowly. There is blood in the sand, and the calm of lunch is gone.",
          note: ""
        },
        {
          title: "The revolver",
          heat: 37,
          text:
            "Raymond goes back, bandaged and armed. Meursault walks beside him. They find the two men by a rock, near a " +
            "small spring. Meursault asks for the revolver, and Raymond hands it over. For a moment, it could go either " +
            "way. Nothing happens. They walk back to the cabin.",
          note: ""
        },
        {
          title: "Alone",
          heat: 39,
          text:
            "He can't face the stairs, the women, the talking. So he turns around and walks back into the light. The heat " +
            "leans on him, and the sand throws it back up into his face. He is thinking of the cool spring behind the " +
            "rock: shade, quiet. He is still holding Raymond's revolver.",
          note: ""
        },
        {
          title: "The light",
          heat: 42,
          text:
            "The ex-girlfriend's brother is there, alone, lying by the spring. Meursault takes one step forward. His blade rises and " +
            "catches the sun, and the light stabs at Meursault's eyes. Sweat runs into them. The sea breathes fire. His " +
            "hand tightens, and the first shot breaks the afternoon. It isn't anger, and it isn't a plan. He doesn't " +
            "want this man dead. It is the heat: the sun pressing on his skull, the light in his eyes, his body moving " +
            "before his mind can catch up.",
          note: ""
        }
      ]
    }
  ],

  // Sunday lunch: the calm before the beach. Its own section, between Raymond and The beach.
  lunch: {
    title: "Sunday lunch",
    place: "Masson's cabin by the sea",
    heat: 31,
        text:
      "He wakes up drained, and Marie teases him about his \"funeral face.\" Raymond is in high spirits. He notices " +
      "the Arabs watching from across the street, one of them the brother of his ex-girlfriend, but insists that " +
      "everything is settled now. On the bus, Meursault " +
      "can tell Raymond likes Marie. She doesn't give him a second look.\n\n" +
      "At the cabin of Raymond's friend Masson, there is fried fish caught that morning, the sea, and belonging. While Masson talks, Meursault " +
      "feels the sun doing him good. He swims out with Marie, and for the first time, he says it plainly: we were " +
      "happy. Later she lies beside him on the sand. He drifts off, she kisses him, and he wants her. For the first " +
      "time, he thinks he might really marry her.\n\n" +
      "Then lunch: bread and fish, meat and fried potatoes, wine and cigarettes.",

    // Shown after the web of connection, before the question about the two men
    afterTable:
      "For once, everything was going exactly the way it should. He deserved a chance at a happy life, and for a " +
      "few pages, I got to watch him have one. Then the three men stood up from the table and set off for a walk " +
      "along the beach.",
    // The web of connection: tap a name to light up who they are tied to.
    // x and y place each name in the space (0 = left/top, 100 = right/bottom). gold: true lights the name up in gold when tapped.
    // Change "note" to your own words.
    guests: [
      { name: "Meursault", x: 50, y: 50, gold: true, note: "Close to happy, and half asleep. His head is heavy with wine and sun, and for once, he doesn't want to be anywhere else." },
      { name: "Marie", x: 24, y: 22, gold: true, note: "She laughs at every joke, so freely that Meursault suspects she's had a little too much to drink. She is the lightness of the day." },
      { name: "Raymond", x: 76, y: 20, note: "Cheerful and full of plans. Over lunch, the three men talk about spending August together at the cabin and sharing the costs. A future, sketched at the table." },
      { name: "Masson", x: 70, y: 82, note: "Friendly and generous. He keeps Meursault's glass full of wine, and his own even fuller." },
      { name: "Madame Masson", x: 22, y: 80, note: "She laughs at the jokes right alongside Marie, and tells her husband she likes Meursault. She likes a nap after lunch, but first the two women clear the table together, like old friends." }
    ],
    // Who is tied to whom. Add "one-sided" for a connection that only goes one way (drawn dashed).
    threads: [
      ["Meursault", "Marie"],
      ["Marie", "Madame Masson"],
      ["Meursault", "Masson"],
      ["Masson", "Madame Masson"],
      ["Meursault", "Raymond"],
      ["Raymond", "Masson"],
      ["Raymond", "Marie", "one-sided"]
    ],
    // The small direction under the cigarette (it fades once someone clicks)
    cigHint: "Take a drag: click the cigarette.",
    // The question at the end of the lunch, its button, and what appears beside the two dots
    watchersQuestion: "Did you notice the two men on the beach?",
    watchersButton: "Show me",
    watchersReveal: "They've been there the whole time.",
    segue: "Then the afternoon turned white."
  },

  // The line above the Knock button, so first-time readers know what the knocks are
  knocksIntro:
    "Then he fires four more times into the still body. Camus compares them to knocking on the door of " +
    "unhappiness. Knock once for each.",
  // The four knocks that close Part One
  knocks: [
    "One.",
    "Two.",
    "Three.",
    "Four. And the afternoon is over."
  ],

  // The big quote between the beach and Part Two. Type the line exactly as it appears in your copy.
  bigQuote: "I just shut up, smoked a cigarette, and looked at the sea.",
  bigQuoteCredit: "Meursault, The Stranger (trans. Matthew Ward)",

  // The quiet line on Part Two's title page
  partTwoLine: "The cell, the trial, and the last night.",

  // Part Two: the cell and the court
  partTwo: [
    {
      title: "The cell",
      happens:
        "After the shooting, Meursault is arrested, questioned by a magistrate and given a young lawyer. He spends " +
        "almost a year in prison waiting for his trial.",
      place: "Prison, Algiers",
      text:
        "Prison is where Meursault finally starts to look inward. He sleeps sixteen hours a day. The rest he spends inside " +
        "his memories, living them again. Marie visits once, then stops coming. Not because she's tired of him, but because she " +
        "isn't his wife. Without cigarettes, he sucks on wood chips torn from his bed. Then, after a few weeks, he stops " +
        "wanting them at all. At the courthouse, a policeman holds out a cigarette. He turns it down. Of everything he " +
        "does, that told me most about who he is. In <em>The Myth of Sisyphus</em>, his essay about a man condemned to " +
        "push a boulder uphill forever, Camus says the struggle itself is enough to fill a heart. Meursault's cell proves it."
    },
    {
      title: "The trial",
      happens:
        "The witnesses include the director of his mother's home, Raymond, Masson, Marie, and Céleste, the café owner. " +
        "The prosecutor dwells on the funeral more than the killing, and Meursault is sentenced to death.",
      place: "The courtroom",
      text:
        "In court, Meursault becomes a monster, built piece by piece out of the evidence against him. His lawyer is " +
        "hopeless, and Meursault won't help. He could defend himself better than anyone, but he refuses to try. His " +
        "honesty is too abrupt for the room. The judge and jury mistake it, again and again, for a lack of feeling. " +
        "His friends try. Céleste, the owner of the café where Meursault eats every day, calls it bad luck and is cut off. Raymond says it was chance. The prosecutor twists " +
        "Marie's account of the day after the funeral, the swim and the comedy film, into proof of a cold heart. Céleste was his realest friend. After the court shuts " +
        "him down, he can't raise his head again. Then the verdict: death, in a public square. I was distraught."
    },
    {
      title: "The chaplain",
      happens:
        "Waiting to hear about his appeal, Meursault refuses the prison chaplain three times. At the home, his mother had " +
        "a companion near the end of her life, Thomas Pérez, and on this last night Meursault finally understands why.",
      place: "The cell, the last days",
      text:
        "The chaplain is relentless, and honestly, annoying. He comes with hope and God to a man who has asked for " +
        "neither. Meursault breaks. He seizes the chaplain and pours out everything he has held back. Given his fate, " +
        "I couldn't blame him. When it's over, something in him is lighter. He thinks of Maman, who found love again " +
        "at the end of her life with a companion at the home, and he understands why. He comes to terms with his fate, as he always has: adapting " +
        "to whatever life hands him and carrying it through. That is exactly why I understood him. He reminds me of " +
        "[[spike|Spike Spiegel]] from <em>Cowboy Bebop</em>, shrugging at the end of everything: whatever happens, happens."
    }
  ],

  // The interactive courtroom. Each card is a piece of "evidence" the prosecutor uses.
  courtIntro:
    "You are the jury. Below is what the prosecution put in front of you. Select every piece of evidence that is actually about the killing.",
  evidence: [
    { text: "He did not cry at his mother's vigil.", aboutCrime: false },
    { text: "He smoked and drank coffee beside the coffin.", aboutCrime: false },
    { text: "He went swimming and to a comedy film the next day.", aboutCrime: false },
    { text: "He shot a man five times on the beach.", aboutCrime: true },
    { text: "He does not believe in God.", aboutCrime: false },
    { text: "He did not know his mother's age.", aboutCrime: false }
  ],
  verdict:
    "One card out of six. That is roughly how much of the trial is about the man on the beach. The rest is about whether he grieved correctly. " +
    "Camus said Meursault is condemned because he refuses to play the game — he won't say more than he feels.",

  // The ending
  ending:
    "On his last night he looks up at the stars and, for the first time, opens himself to what Camus calls " +
    "la tendre indifférence du monde, the gentle indifference of the world. The universe doesn't care, and instead of despair, he feels free. He is " +
    "ready to die, and he only hopes for a large crowd on the day, greeting him with cries of hate. I closed the " +
    "book thinking that might be the strangest happy ending ever written. One must imagine Sisyphus happy, and " +
    "Meursault too.",

  // Your closing words, after the last night
  afterwordTitle: "A friend",
  afterword:
    "Somewhere between the bus rides and the last page, the stranger became someone I knew better than most people " +
    "I've met. Meursault never pretends. " +
    "He doesn't cry when he's told he should, he doesn't say he loves someone just to be kind, and he doesn't beg " +
    "for his life with words he doesn't mean. I've pushed feelings away and kept busy so I wouldn't have to sit " +
    "with them. I've accepted things I couldn't change. And in the end, his acceptance is the most humane act in " +
    "the whole book: no hatred for the world that condemned him, no false hope, just peace with what is. That's " +
    "why I understand him now, not as a character, but as a friend.",

  // Small cards that open when a reader clicks a name marked like [[bourdain|Anthony Bourdain]] in the text
  refs: {
    bourdain:
      "Chef, writer and travel host (1956–2018), known for <em>Kitchen Confidential</em> and <em>Parts Unknown</em>, " +
      "who believed the best way to understand people was to sit down and eat with them.",
    spike:
      "The laid-back bounty hunter at the heart of <em>Cowboy Bebop</em> (1998), drifting through space and his " +
      "own past with a shrug."
  },

  // About this reading: the note at the very bottom, with links to your other work.
  // Paste each link's web address between the quotes in "url". Links with an empty url stay hidden.
  about:
    "I'm Christian Angelo. I read, write and build things for the web, and this is one of a few interactive pieces " +
    "I've made about the books and music that stayed with me.",
  links: [
    { label: "The Dark Side of the Moon, a feature page", url: "" },
    { label: "The Line, a runway viewer", url: "" }
  ],

  closingNote: "Tap the sky to add a star.\nThey don't mean anything. That's the point.",
};