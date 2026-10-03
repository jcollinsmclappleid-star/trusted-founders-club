import Image from "next/image";
import { EnquiryForm } from "@/components/enquiry-form";
import { HeroSlider } from "@/components/hero-slider";
import { IntroVideo } from "@/components/intro-video";
import { TopicTrail } from "@/components/topic-trail";
import { siteConfig } from "@/lib/site";

function Alias({ id }: { id: string }) {
  return <div id={id} className="h-0 scroll-mt-28" />;
}

export default function HomePage() {
  return (
    <main>
      <div className="hero-stage">
        <section aria-labelledby="top" className="hero-frame">
          <HeroSlider />
          <div className="hero-copy">
            <Alias id="welcome" />
            <Alias id="dermot-cox-counselling" />
            <Alias id="psychotherapy" />
            <Alias id="counselling" />
            <h1 id="top" tabIndex={-1} className="scroll-mt-28 font-display text-forest">
              <span className="block text-[2.55rem] leading-none sm:text-5xl lg:text-6xl">Dermot Cox</span>
              <span className="mt-2 block text-lg leading-snug font-normal text-ink sm:text-2xl">
                Psychotherapy and counselling for individuals and couples, in person in Little
                Hampden, near Great Missenden, and online.
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-base leading-snug sm:text-lg">
              A quiet place to talk, in the garden consulting room, in the countryside around the
              village, or online.
            </p>
            <a href="#contact" className="submit-button hero-cta mt-3 inline-flex items-center no-underline">
              Arrange a first conversation
            </a>
          </div>
        </section>

        <section aria-label="Opening" className="opening-sheet">
          <p className="opening-line">
            You may need support because there are no people in your life you feel able to share
            deeply with. You may feel pain that won’t go away. Attempts to distract yourself may no
            longer be working. It may be time to look inside and try and see what’s going on.
          </p>
          <nav className="service-paths" aria-label="Choose a service">
            <div>
              <p className="path-label">Individual</p>
              <a href="#individual-therapy">Individual therapy</a>
              <a href="#grief">Grief and loss</a>
              <a href="#work-and-life">Work and a personal life</a>
            </div>
            <div>
              <p className="path-label">Couples</p>
              <a href="#couples-therapy">Couples therapy</a>
              <a href="#relating">Sexual identity and open relating</a>
            </div>
          </nav>
        </section>
      </div>

      <section aria-labelledby="individual-therapy" className="service-region wood-individual chapter">
        <div id="services" className="h-0 scroll-mt-28" />
        <div className="region-inner">
          <p className="path-label">Individual</p>
          <h2
            id="individual-therapy"
            tabIndex={-1}
            className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl"
          >
            Individual therapy
          </h2>
          <div className="service-note">
            <h3 className="font-display text-4xl text-forest">Who it is for</h3>
            <p>
              I’m someone you can talk to who will listen attentively. This is for you if you want a
              place to discover how you really feel, and to look at what is causing you difficulty
              or distress now.
            </p>
          </div>
          <div className="service-note">
            <h3 className="font-display text-4xl text-forest">How it can help</h3>
            <p>
              I’ll learn what matters to you and concerns you – without judging. We might also
              explore whether what is difficult now links to experiences in your earlier life. The
              problems we have with relationships or self-destructive behaviour often have roots in
              the past. There is time to stay with it, and to see it, rather than to be moved on.
            </p>
          </div>
          <div className="service-questions">
            <h3 className="font-display text-4xl text-forest">Questions you may have</h3>
            <div>
              <h4>Do I need to know what is wrong?</h4>
              <p>You don’t have to arrive with the difficulty already named.</p>
            </div>
            <div>
              <h4>Will we only talk about the present?</h4>
              <p>
                We start with what is difficult now. If it belongs, we can look at whether an
                earlier experience is still part of it.
              </p>
            </div>
            <div>
              <h4>What if none of the names fit?</h4>
              <p>
                Then choose Something else. A first conversation is enough. You don’t need a full
                account of your history.
              </p>
            </div>
          </div>
          <TopicTrail
            support="I’ll listen attentively, without judging. We look at what is causing difficulty now, and, if it belongs, whether an earlier experience is still part of it. You don’t have to arrive with it already named."
            topics={[
              {
                id: "grief",
                label: "Grief and loss",
                detail:
                  "I trained as a bereavement volunteer with Cruse and work with people experiencing intense grief and loss. If that is what you are carrying, it can be the centre of the work. It does not have to be set aside so that we can talk about something else.",
              },
              {
                id: "work-and-life",
                label: "Work and a personal life",
                detail:
                  "Before becoming a therapist, I worked as a marketing consultant in professional and financial services. I’m familiar with the tension this world creates between business success and personal life, and the pressure it puts on building and sustaining personal relationships. If that pressure is familiar, we can look at it directly.",
              },
              {
                id: "topic-anxiety",
                label: "Anxiety",
                detail:
                  "Anxiety is one of the most common reasons people look for a place to talk. It can be part of what is difficult now, and, if it belongs, part of an earlier experience.",
              },
              {
                id: "topic-mood",
                label: "Low mood",
                detail:
                  "Low mood is a common reason to begin. The conversation can stay with how it feels now, and with whether something earlier is still part of it.",
              },
              {
                id: "topic-stress",
                label: "Stress",
                detail:
                  "Stress is often what brings someone to individual therapy. There is time to look at the pressure itself, rather than to be moved past it.",
              },
              {
                id: "topic-relationships",
                label: "Relationships",
                detail:
                  "Difficulties in relationships are often part of individual therapy. We can look at what is happening now, and at whether it has roots further back.",
              },
              {
                id: "topic-esteem",
                label: "Self-esteem",
                detail:
                  "How you see yourself can be part of the same conversation: what is difficult now, and what may have shaped it.",
              },
              {
                id: "topic-change",
                label: "A change in life",
                detail:
                  "A change in life is a common reason to begin. There is time here to see what it has stirred, rather than to be hurried on.",
              },
              {
                id: "topic-else-individual",
                label: "Something else",
                catchAll: true,
                detail:
                  "You don’t have to match a heading. Tell me what is actually going on, even if it does not have a name yet. The first conversation is a place to find out whether working together feels right.",
              },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="couples-therapy" className="service-region wood-couples chapter">
        <div className="region-inner">
          <p className="path-label">Couples</p>
          <h2
            id="couples-therapy"
            tabIndex={-1}
            className="scroll-mt-28 font-display text-5xl sm:text-6xl"
          >
            ‘Couples’ therapy
          </h2>
          <div className="service-note">
            <h3 className="font-display text-4xl">Who it is for</h3>
            <p>
              I also offer ‘couples’ therapy – I use quotation marks because some people wishing to
              work on their intimate relationships don’t see themselves as being in an exclusive
              ‘couple’. Relationships are where we have some of the most intense experiences in our
              lives. They are also where we have the greatest scope to learn and grow, particularly
              by examining the painful experiences they can give rise to.
            </p>
          </div>
          <div className="service-note">
            <h3 className="font-display text-4xl">How it can help</h3>
            <p>
              As therapist, I offer a neutral and contained space where you can look at repetitive
              patterns of conflict or dissatisfaction in safety, knowing each person’s perspective
              will be given equal value. Together, you may find new ways of relating that rekindle
              the intimacy you originally sought. You will certainly reach a deeper understanding of
              the dynamics of your relationship and what scope there is for change.
            </p>
          </div>
          <div className="service-questions">
            <h3 className="font-display text-4xl">Questions you may have</h3>
            <div>
              <h4>What if we don’t call ourselves a couple?</h4>
              <p>
                The quotation marks are there for that reason. If you want to work on an intimate
                relationship, you are welcome, whether or not you see yourselves as exclusive.
              </p>
            </div>
            <div>
              <h4>Will one of us be blamed?</h4>
              <p>
                Each person’s perspective is given equal value. The space is neutral, so the work is
                not about deciding who is at fault.
              </p>
            </div>
            <div>
              <h4>What if we don’t agree about what needs to change?</h4>
              <p>
                You don’t have to arrive agreeing. The work is a place to understand the dynamics,
                and what scope there is for change.
              </p>
            </div>
          </div>
          <TopicTrail
            support="I offer a neutral and contained space, and each person’s perspective is given equal value. You don’t have to arrive as an exclusive couple, or with the difficulty already named."
            topics={[
              {
                id: "topic-communication",
                label: "Communication",
                detail:
                  "How you speak, and how you hear each other, is often where this work begins.",
              },
              {
                id: "topic-conflict",
                label: "Conflict",
                detail:
                  "Repetitive patterns of conflict can be looked at here, with each person’s perspective given equal value.",
              },
              {
                id: "topic-intimacy",
                label: "Intimacy",
                detail:
                  "If intimacy has faded, or become difficult to speak about, that can be the centre of the work.",
              },
              {
                id: "topic-trust",
                label: "Trust",
                detail:
                  "Trust is a common reason people look for couples therapy. It can be spoken about in the same contained space.",
              },
              {
                id: "topic-apart",
                label: "Growing apart",
                detail:
                  "A sense of growing apart is a common reason to begin. The work is a place to understand the dynamics of the relationship, and what scope there is for change.",
              },
              {
                id: "relating",
                label: "Sexual identity and open relating",
                detail:
                  "I’m comfortable in the world of conscious sexuality and work with clients exploring their experiences and feelings around sexual identity and open relating/polyamory. This sits inside the ‘couples’ work. It is not a separate service, and it will be met without judgement.",
              },
              {
                id: "topic-else-couples",
                label: "Something else",
                catchAll: true,
                detail:
                  "If what you are carrying doesn’t sit under one of these names, bring that. You don’t have to have the right words before we speak. A first conversation is a place to find out whether working together feels right.",
              },
            ]}
          />
          <p className="mt-8 text-lg">
            <a className="text-link" href="#contact">
              Ask about couples work
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="about" className="about-chapter">
        <div className="about-layout">
          <div className="about-intro">
            <Alias id="aboutme2" />
            <h2 id="about" tabIndex={-1} className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl">
              About me
            </h2>
          </div>
          <figure className="about-portrait">
            <Image
              src="/media/portrait.jpg"
              alt="Dermot Cox, photographed outdoors with autumn leaves behind him"
              width={500}
              height={750}
              sizes="272px"
              className="h-auto w-full"
            />
          </figure>
          <div className="about-copy">
            <div className="prose-copy text-xl leading-relaxed">
              <p>
                I trained as a psychotherapist at Re-Vision, which describes its approach as
                ‘therapy with a soulful perspective’. The strongest influence in this training is
                Jung. In this perspective, times of real difficulty or despair are seen as holding
                a potential for change and growth.
              </p>
              <p>
                I spent three years as a counsellor in the student counselling service of my local
                university. I worked both short- and long-term with students in their teens and
                twenties, as well as mature students. One theme I noticed is that many people are
                still deeply affected by the divorce of their parents.
              </p>
              <p>
                Being connected to nature is important to me. I live in the Chiltern Hills in
                Buckinghamshire.
              </p>
              <p>
                With the help of a teacher, I’m exploring non-duality through practising being
                present and mindful.
              </p>
            </div>
            <p className="mt-8 text-lg">
              <a className="text-link" href="#contact">
                Get in touch about working together
              </a>
            </p>
            <div className="about-film">
              <p className="max-w-xl text-xl leading-relaxed">
                I recorded the short video below in my home consulting room so you can get a better
                sense of me and my approach to therapy.
              </p>
              <div className="mt-6 max-w-[40rem]">
                <IntroVideo />
              </div>
              <p className="mt-3 max-w-xl text-base text-ink/80">
                Captions are not available for this film yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach" className="approach-chapter chapter">
        <div className="region-inner">
          <Alias id="working-together" />
          <Alias id="workingtogether" />
          <h2 id="approach" tabIndex={-1} className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl">
            How we can work together
          </h2>
          <ol className="process">
            <li>
              <span className="process-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none">
                  <path d="M18 46V28c0-6 4-10 8-10h0" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M46 46V28c0-6-4-10-8-10h0" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M14 46h36" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="32" cy="22" r="3" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <h3 className="font-display text-3xl text-forest">A first conversation</h3>
              <p>
                A free 30-minute conversation, by phone or video, is a chance to meet and to see
                whether working together feels right. It is not a session, and you don’t need to
                arrive with a full account of your history.
              </p>
            </li>
            <li>
              <span className="process-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M32 20v12l8 5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <h3 className="font-display text-3xl text-forest">A time to meet</h3>
              <p>
                Meeting at a regular time each week is generally the most supportive arrangement for
                individual therapy. ‘Couples’ therapy may benefit from greater flexibility in the
                timing of sessions.
              </p>
            </li>
            <li>
              <span className="process-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none">
                  <path d="M12 46c8-14 14-22 20-22s12 8 20 22" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M32 24v-8" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="32" cy="14" r="2" fill="currentColor" />
                </svg>
              </span>
              <h3 className="font-display text-3xl text-forest">You are welcome</h3>
              <p>
                I recognise and welcome diversity among my clients in all its forms, including
                cultural diversity, Gender Relationship and Sexual Diversity (GRSD and LGBTQIA+) and
                neurodiversity.
              </p>
            </li>
          </ol>
          <div className="training-note">
            <h2
              id="experience"
              tabIndex={-1}
              className="scroll-mt-28 font-display text-4xl text-forest sm:text-5xl"
            >
              A safe space
            </h2>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed">
              The work needs a safe space: somewhere you can discover how you really feel, without
              being judged, and where each person’s perspective can be held with equal care.
            </p>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed">
              I have Diplomas in Integrative Transpersonal Counselling and Psychotherapy from
              Re-Vision. I’m a Registered Member of BACP (British Association for Counselling and
              Psychotherapy) and UKCP (UK Council for Psychotherapy). I abide by the codes of ethics
              of both organisations.
            </p>
            <ul className="member-marks">
              <li>
                <img
                  src="/media/bacp-logo.jpg"
                  alt="BACP, British Association for Counselling and Psychotherapy"
                  width={752}
                  height={171}
                  className="member-logo"
                />
              </li>
              <li>
                <img
                  src="/media/ukcp-logo.svg"
                  alt="UKCP, UK Council for Psychotherapy"
                  width={420}
                  height={228}
                  className="member-logo member-logo-ukcp"
                />
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Where we meet" className="place-chapter">
        <div className="place-grid">
          <article className="place-card">
            <figure className="visit-figure">
              <Image
                src="/media/garden-room.jpg"
                alt="The timber garden consulting room, with a green roof, among trees and fallen leaves"
                fill
                sizes="(min-width: 900px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </figure>
            <div className="place-copy">
              <h2 id="in-person" tabIndex={-1} className="scroll-mt-28 font-display text-5xl text-forest">
                The garden room
              </h2>
              <div className="prose-copy mt-5 text-xl leading-relaxed">
                <p>
                  I work face-to-face with clients from my consulting room in Little Hampden, close
                  to Great Missenden in Buckinghamshire. The room is in my garden, with views over
                  fields and woods. We can also have outdoor sessions in the countryside near my home.
                </p>
                <p>
                  I’m about 5 minutes by taxi from Great Missenden station on the Chiltern line, which
                  is about 50 minutes from Marylebone. The postcode is HP16 9PS.
                </p>
              </div>
              <p className="mt-6 text-lg">
                <a className="text-link" href="#contact">
                  Ask about visiting
                </a>
              </p>
            </div>
          </article>
          <article className="place-card">
            <figure className="visit-figure">
              <Image
                src="/media/autumn-sky.jpg"
                alt="Looking up through yellow and green autumn leaves"
                fill
                sizes="(min-width: 900px) 50vw, 100vw"
                className="object-cover object-[center_40%]"
              />
            </figure>
            <div className="place-copy">
              <h2 id="online" tabIndex={-1} className="scroll-mt-28 font-display text-5xl text-forest">
                Online sessions
              </h2>
              <p className="mt-5 text-xl leading-relaxed">
                I offer online sessions for clients who prefer this or who live in a different area.
                The same fees apply as meeting in person.
              </p>
              <p className="mt-6 text-lg">
                <a className="text-link" href="#contact">
                  Ask about online sessions
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="fees" className="fees-chapter">
        <div className="fees-sheet chapter">
          <Alias id="pricing" />
          <h2 id="fees" tabIndex={-1} className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl">
            Fees
          </h2>
          <p className="mt-3 text-lg">Fees per session, in person or online.</p>
          <dl className="fee-list">
            <div>
              <dt>Individual therapy</dt>
              <dd>
                <span className="fee-figure">£75</span>
                <span className="fee-length">50 minutes</span>
              </dd>
            </div>
            <div>
              <dt>‘Couples’ therapy</dt>
              <dd>
                <span className="fee-figure">£120</span>
                <span className="fee-length">60 minutes</span>
              </dd>
            </div>
          </dl>

          <h3 id="questions" tabIndex={-1} className="scroll-mt-28 mt-16 font-display text-4xl text-forest sm:mt-20 sm:text-5xl">
            Before you get in touch
          </h3>
          <div className="question-grid">
            <div>
              <h4 className="font-display text-2xl text-forest">Where do we meet?</h4>
              <p>
                In the garden consulting room in Little Hampden, near Great Missenden, or outdoors
                nearby. The room is not in Great Missenden itself.
              </p>
            </div>
            <div>
              <h4 className="font-display text-2xl text-forest">Can we meet online?</h4>
              <p>
                Yes. Online sessions are offered alongside meeting in person, for the same fees.
              </p>
            </div>
            <div>
              <h4 className="font-display text-2xl text-forest">How do we begin?</h4>
              <p>
                With a free 30-minute conversation by phone or video, to meet and to talk about
                working together.
              </p>
            </div>
            <div>
              <h4 className="font-display text-2xl text-forest">How often do we meet?</h4>
              <p>
                A regular weekly time usually supports individual therapy best. Couples work can be
                more flexible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact" className="contact-chapter chapter">
        <div className="contact-layout">
          <div className="contact-aside">
            <h2 id="contact" tabIndex={-1} className="scroll-mt-28 font-display text-5xl sm:text-6xl">
              Get in touch
            </h2>
            <p className="mt-6 max-w-md text-xl leading-relaxed">
              I offer a free 30-minute discussion by phone or video call if you’d like to meet me
              and discuss working together.
            </p>
            <p className="mt-8 text-2xl">
              <a className="contact-link" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-xl">
              <a className="contact-link" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-8 max-w-xs text-lg leading-relaxed text-ivory/85">
              Little Hampden, close to Great Missenden, Buckinghamshire.
            </p>
          </div>
          <div className="contact-form">
            <EnquiryForm />
            <p className="mt-2 max-w-xl text-base text-ink/75">
              Your message is sent by email. It is not stored in a database on this site.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
