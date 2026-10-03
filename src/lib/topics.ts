import type { Topic } from "@/components/topic-trail";

export const individualSupport =
  "I’ll listen attentively, without judging. We look at what is causing difficulty now, and, if it belongs, whether an earlier experience is still part of it. You don’t have to arrive with it already named.";

export const couplesSupport =
  "I offer a neutral and contained space, and each person’s perspective is given equal value. You don’t have to arrive as an exclusive couple, or with the difficulty already named.";

export const couplesPromise =
  "I will listen without taking sides. Each of you will be heard, and neither of you will be hurried. There is time for the difficult thing to be said, even before it has a name.";

export const individualTopics: Topic[] = [
  {
    id: "grief",
    label: "Grief and loss",
    detail: `I trained as a bereavement volunteer with Cruse and work with people experiencing intense grief and loss. If that is what you are carrying, it can be the centre of the work. It does not have to be set aside so that we can talk about something else.

Grief does not keep to a tidy order, and it does not finish when other people hope it will. It may be the death of someone you love. It may be another loss: a relationship, a home, your health, work, or a future you had counted on. Some days it is sharp. Some days it is only a flatness, or the sense that ordinary life is happening somewhere else.

People come for grief counselling when they are still carrying it, and when there is nowhere left to put it down. We can stay with how the bereavement actually feels, and with what it has done to your sleep, your days, and the people around you. If an earlier loss is stirred, we can look at that when it belongs. I will not ask you to be done with it.`,
  },
  {
    id: "work-and-life",
    label: "Work and a personal life",
    detail: `Before becoming a therapist, I worked as a marketing consultant in professional and financial services. I’m familiar with the tension this world creates between business success and personal life, and the pressure it puts on building and sustaining personal relationships. If that pressure is familiar, we can look at it directly.

That world can ask for long hours, a steady public face, and very little room to say that you are tired or unsure. A personal life starts to feel like something you will get to later. The person waiting at home meets someone who is still, in some way, at work.

People look for counselling here when success and a personal life will no longer sit quietly together. We can look at what the pressure is doing now, and at what it costs to keep performing. We might also look at where that drive began. The aim is not to tell you to want less. It is to see the life you are actually living, and what you want to be able to sustain.`,
  },
  {
    id: "topic-anxiety",
    label: "Anxiety",
    detail: `Anxiety is one of the most common reasons people look for a place to talk. It can be part of what is difficult now, and, if it belongs, part of an earlier experience.

It may be a mind that will not settle, a body that stays braced, or a habit of staying away from whatever sets it off. Nights can fill with what might go wrong. Days can shrink around keeping the feeling down. You may know the worry very well, and still not know why it has taken this hold.

In anxiety counselling we begin with what is happening now: what you fear, what you do to get through it, and what that is costing you. There is time to stay with the feeling, rather than to be talked out of it. If something earlier is still feeding it, we can look there when it belongs.`,
  },
  {
    id: "topic-mood",
    label: "Low mood",
    detail: `Low mood is a common reason to begin. The conversation can stay with how it feels now, and with whether something earlier is still part of it.

It can feel like heaviness, a smaller life, or a morning that is hard to enter. Pleasure thins. Ordinary tasks ask for more effort than they used to. You may be functioning in front of other people and feel very far away once you are alone.

Low mood counselling is a place to say how it actually is, without having to brighten it for anyone. We look at what has closed in, and at what the days have become. If an earlier experience is still weighing on it, there is room for that too. You do not have to call it by a clinical name before we begin.`,
  },
  {
    id: "topic-stress",
    label: "Stress",
    detail: `Stress is often what brings someone to individual therapy. There is time to look at the pressure itself, rather than to be moved past it.

It may be work, care for other people, money, or the feeling that there is no pause in which you can think. The body keeps the score of it: poor sleep, a short temper, a mind that will not switch off. What began as a busy season can become the way life is lived.

Stress counselling can stay with the pressure, instead of offering a list of ways to cope and then moving on. We look at what is being asked of you, what you have stopped, and what happens if the pace does not change. If the strain has a longer history, we can look at that when it belongs.`,
  },
  {
    id: "topic-relationships",
    label: "Relationships",
    detail: `Difficulties in relationships are often part of individual therapy. We can look at what is happening now, and at whether it has roots further back.

You may be caught in the same argument, the same withdrawal, or the same hope that this time it will be different. It may be a partner, a parent, a friend, or the ache of not having the relationship you want. The problem we have with other people often has roots in the past, and it is still happening in the present.

Relationship counselling for one person is a place to see your part of the pattern without being blamed for it. We can look at what you long for, what you protect yourself from, and what you do when you are hurt. The other person does not have to be in the room for that seeing to begin.`,
  },
  {
    id: "topic-esteem",
    label: "Self-esteem",
    detail: `How you see yourself can be part of the same conversation: what is difficult now, and what may have shaped it.

It may be a harsh inner voice, a habit of comparison, or the sense that other people are about to find you out. Praise does not land. A mistake becomes the whole story of who you are. You may look capable from the outside and feel unlikeable, or not enough, once you are alone with yourself.

Self-esteem is not a separate project from the rest of the work. We can look at the voice that criticises you, and at where it was learned. There is time to notice what you dismiss in yourself. Nothing here asks you to recite a brighter story before the old one has been heard.`,
  },
  {
    id: "topic-change",
    label: "A change in life",
    detail: `A change in life is a common reason to begin. There is time here to see what it has stirred, rather than to be hurried on.

It may be an ending, a beginning, or both at once: leaving work, retiring, children growing up, a move, an illness, a separation, or a role that no longer fits. Other people may expect you to be grateful, or to be over it. You may not yet know what you feel.

Counselling at a time of change gives the stir a place to be spoken. We look at what has been lost as well as what is new, and at the part of you that is unsure. If an earlier change is still alive in this one, we can look at that when it belongs. You do not have to know the next step before we meet.`,
  },
  {
    id: "topic-else-individual",
    label: "Something else",
    catchAll: true,
    detail: `You don’t have to match a heading. Tell me what is actually going on, even if it does not have a name yet. The first conversation is a place to find out whether working together feels right.

Many people arrive without a neat problem. There is a restlessness, a sadness that will not explain itself, a relationship that feels wrong, or a life that looks fine and does not feel fine. Waiting until you can describe it perfectly is often what keeps the conversation from starting.

If none of the other names fit, this is the place to begin. You can say it badly. You can say you do not know. I will listen, and we will see together whether what you are carrying belongs here. A detailed history is not required before that first conversation.`,
  },
];

export const couplesTopics: Topic[] = [
  {
    id: "topic-communication",
    label: "Communication",
    detail: `How you speak, and how you hear each other, is often where this work begins.

One of you may talk more when things are hard. The other may go quiet. The same subject returns, and both of you leave it feeling unheard. It can look like a practical disagreement. Underneath, it is often the fear of being dismissed, or of saying the thing that might make it worse.

Couples therapy for communication is a contained place to slow that pattern down. Each person’s perspective is given equal value, so the louder voice does not win the hour. We look at what you are trying to say, and at what the other person actually receives. You do not have to arrive already knowing how to say it well.`,
  },
  {
    id: "topic-conflict",
    label: "Conflict",
    detail: `Repetitive patterns of conflict can be looked at here, with each person’s perspective given equal value.

The row may be about money, family, sex, the housework, or something that seemed small until it opened the same old wound. You may already know the steps: the criticism, the defence, the silence, the uneasy peace. What repeats is often more important than who started this particular argument.

In couples therapy we look at the pattern in safety, rather than holding another round of it with no one to steady the room. Neither of you is recruited as the problem. There is time to see what the conflict protects, and what each of you is afraid of losing. You do not have to agree about the facts before that looking can begin.`,
  },
  {
    id: "topic-intimacy",
    label: "Intimacy",
    detail: `If intimacy has faded, or become difficult to speak about, that can be the centre of the work.

Closeness may have narrowed to logistics. Touch may have become rare, or fraught. One of you may feel refused. The other may feel pressed. Desire does not always match, and the mismatch can turn into shame, or into a silence that spreads into the rest of the relationship.

Intimacy in couples therapy includes what you no longer say, as well as what happens, or does not happen, between you physically. Together, you may find new ways of relating. At the least, you can reach a clearer understanding of what has happened to the closeness you wanted. It can be spoken about here without either of you being hurried, or shamed.`,
  },
  {
    id: "topic-trust",
    label: "Trust",
    detail: `Trust is a common reason people look for couples therapy. It can be spoken about in the same contained space.

Something may have been hidden: an affair, a debt, a message, a life lived partly out of view. Or the break may be quieter, a long drift in which you no longer believe the other person will stay, tell the truth, or choose you. Reassurance helps for a moment, and then the doubt returns.

We can look at what was broken, and at what each of you needs in order to speak about it without a further injury. Equal attention matters here especially. The person who was hurt, and the person who caused the hurt, both have a place in the room. I cannot say that trust will return. I can say that it can be spoken about here, and that neither of you will be left to carry it alone in the session.`,
  },
  {
    id: "topic-apart",
    label: "Growing apart",
    detail: `A sense of growing apart is a common reason to begin. The work is a place to understand the dynamics of the relationship, and what scope there is for change.

You may be kind, and lonely. The days run side by side: work, children, separate evenings, a fondness that no longer feels like a life together. One of you may want to try. The other may already be half gone, or simply tired. Friends may say that this is what long relationships become.

Couples therapy at this point is not a push towards staying, or towards leaving. It is a place to see what has thinned, what is still alive, and what each of you is willing to look at. You will reach a deeper understanding of the dynamics between you. What you do with that understanding remains yours.`,
  },
  {
    id: "relating",
    label: "Sexual identity and open relating",
    detail: `I’m comfortable in the world of conscious sexuality and work with clients exploring their experiences and feelings around sexual identity and open relating/polyamory. This sits inside the ‘couples’ work. It is not a separate service, and it will be met without judgement.

You may be questioning a name for your sexuality, or learning how to tell the truth about desire inside a relationship that began with a different agreement. You may be opening the relationship, closing it, or trying to understand a partner whose way of loving does not match the story you were given. Polyamory and other forms of open relating bring their own loyalties, jealousy, and hope.

Those experiences can be spoken about here. The quotation marks around ‘couples’ are there because not everyone in this work sees themselves as an exclusive pair. Each person’s perspective is still given equal value. Nothing in the conversation requires you to justify how you love, or to translate it into someone else’s language, before it can be heard.`,
  },
  {
    id: "topic-else-couples",
    label: "Something else",
    catchAll: true,
    detail: `If what you are carrying doesn’t sit under one of these names, bring that. You don’t have to have the right words before we speak. A first conversation is a place to find out whether working together feels right.

Relationships rarely arrive as a single topic. It may be family pressure, a child, a faith, a move, an illness, or a feeling that something is wrong and neither of you can yet say what. You do not have to agree on the problem. You do not have to call yourselves a couple.

Bring the thing that does not fit the list. I will listen to both of you, without deciding in advance what the work should be about. The first conversation is enough to find out whether this is the right place.`,
  },
];
