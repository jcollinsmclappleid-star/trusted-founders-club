import Image from "next/image";
import { EnquiryForm } from "@/components/enquiry-form";
import { HeroSlider } from "@/components/hero-slider";
import { IntroVideo } from "@/components/intro-video";
import { OnlineFold } from "@/components/online-fold";
import { PhoneLinks, WhatsAppInvite } from "@/components/phone-links";
import { ServicePaths } from "@/components/service-paths";
import { TopicTrail } from "@/components/topic-trail";
import { buckinghamshireAnswer, localPlaces, widerAreaSentence } from "@/lib/areas";
import { siteConfig } from "@/lib/site";
import { couplesPromise, couplesTopics, individualPromise, individualTopics } from "@/lib/topics";

function Alias({ id }: { id: string }) {
  return <div id={id} className="h-0 scroll-mt-28" />;
}

const journey = [
  {
    src: "/media/woodland.jpg",
    alt: "Two people sitting together among autumn trees",
    line: "Sit down in nature",
    note: "A place to be still, among the trees.",
    position: "object-[center_58%]",
  },
  {
    src: "/media/autumn-sky.jpg",
    alt: "Looking up through burnt orange and green autumn leaves",
    line: "Go for a walk",
    note: "In the countryside near the room.",
    position: "object-center",
  },
  {
    src: "/media/garden-room.jpg",
    alt: "The timber garden consulting room, with a green roof, among the trees",
    line: "The garden room",
    note: "A timber room in the garden, quiet among the trees.",
    position: "object-[center_45%]",
  },
] as const;

function TreeBreak({ line }: { line: string }) {
  return (
    <section className="tree-break" aria-label="Places we can meet">
      <p className="tree-line">{line}</p>
      <p className="tree-context">
        There is more than one place to meet. We can sit outside, go for a walk, or use the garden
        room.
      </p>
      <div className="tree-journey">
        {journey.map((stop) => (
          <figure key={stop.line} className="tree-stop reveal">
            <div className="tree-frame">
              <Image
                src={stop.src}
                alt={stop.alt}
                fill
                sizes="(min-width: 1024px) 26vw, 30vw"
                className={`object-cover ${stop.position}`}
              />
            </div>
            <figcaption className="tree-caption">
              {stop.line}
              <span className="tree-note">{stop.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <blockquote className="tree-speech">
        <p>
          “Being connected to nature is important to me. I live in the Chiltern Hills in
          Buckinghamshire. My home consulting room is in my garden, with views over fields and
          woods. I can work with clients outdoors in nature.”
        </p>
      </blockquote>
    </section>
  );
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
            </h1>
            <p className="hero-lede mt-3 max-w-xl text-ink">
              Psychotherapy and counselling in Little Hampden, near Great Missenden
            </p>
            <p className="mt-3 max-w-xl">
              Individual and couples therapy in a private garden consulting room, outdoors in the
              Chilterns, or online.
            </p>
            <a
              href="#contact"
              data-enquiry="general"
              className="submit-button hero-cta mt-3 inline-flex items-center no-underline"
            >
              Arrange a free first conversation
            </a>
          </div>
        </section>

        <section aria-label="Opening" className="opening-sheet">
          <p className="opening-line reveal">
            You may need support because there are no people in your life you feel able to share
            deeply with. You may feel pain that won’t go away. Attempts to distract yourself may no
            longer be working. It may be time to look inside and try and see what’s going on.
          </p>
          <ServicePaths />
          <ul className="trust-line">
            <li>
              <a href="#about">
                <span>Psychotherapist and counsellor</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.bacp.co.uk/therapists/384871/dermot-cox/great-missenden-hp16?search=Dermot%20cox"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="trust-logo trust-logo-bacp"
                  src="/media/bacp-mark.png"
                  alt=""
                  width={378}
                  height={138}
                />
                <span>
                  BACP registered member 384871
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.psychotherapy.org.uk/therapist/Dermot-Cox-IZuHmAAL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="trust-logo trust-logo-ukcp"
                  src="/media/ukcp-mark.svg"
                  alt=""
                  width={420}
                  height={186}
                />
                <span>
                  UKCP registered member
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
            <li>
              <a href="#experience">
                <span>Re-Vision diplomas</span>
              </a>
            </li>
            <li>
              <a href="#in-person">
                <span>In person in Little Hampden</span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <section id="in-person" aria-labelledby="garden-room" tabIndex={-1} className="place-chapter scroll-mt-28">
        <div className="garden-arrival">
          <div className="garden-window-wrap">
            <figure className="garden-window reveal">
              <Image
                src="/media/garden-room.jpg"
                alt="The timber garden consulting room, with a green roof, among trees and fallen leaves"
                fill
                sizes="(min-width: 900px) 56vw, 100vw"
                className="object-cover object-center"
              />
              <figcaption>Little Hampden</figcaption>
            </figure>
          </div>
          <div className="garden-copy reveal">
            <p className="path-label">In person</p>
            <h2 id="garden-room" className="font-display text-5xl text-forest sm:text-6xl">
              The garden room
            </h2>
            <p className="mt-5 text-xl leading-relaxed">
              I work face-to-face with clients from my consulting room in Little Hampden, close to
              Great Missenden in Buckinghamshire. The timber room sits in the garden, a quiet place
              among the trees, with the fields and woods beyond the glass.
            </p>
            <p className="area-note">
              The garden room is in Little Hampden, in the Chilterns, close to Great Missenden.{" "}
              {widerAreaSentence} If the journey is too far, we can meet{" "}
              <a className="text-link" href="#online">
                online
              </a>
              .
            </p>
            <ul className="area-towns" aria-label="Places nearby">
              {localPlaces.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
            <div className="garden-safe">
              <h3 className="subhead">A safe space</h3>
              <p>
                The work needs a safe space: somewhere you can discover how you really feel, without
                being judged, and where each person’s perspective can be held with equal care.
              </p>
            </div>
            <ol className="garden-path">
              <li>
                <img
                  className="line-mark"
                  src="/media/marks/room.png"
                  alt=""
                  width={256}
                  height={256}
                />
                <span>The room</span>
                A timber room in the garden, with a green roof, looking out over fields and woods.
              </li>
              <li>
                <img
                  className="line-mark"
                  src="/media/marks/outside.png"
                  alt=""
                  width={256}
                  height={256}
                />
                <span>Outside</span>
                We can also have outdoor sessions in the countryside near my home.
              </li>
              <li>
                <img
                  className="line-mark"
                  src="/media/marks/journey.png"
                  alt=""
                  width={256}
                  height={256}
                />
                <span>The journey</span>
                About 5 minutes by taxi from Great Missenden station on the Chiltern line, which is
                about 50 minutes from Marylebone. The postcode is HP16 9PS.
              </li>
            </ol>
            <p className="mt-6 text-lg">
              <a className="text-link" href="#contact" data-enquiry="general">
                Arrange a free first conversation
              </a>
            </p>
          </div>
        </div>
      </section>

      <TreeBreak line="A time of real difficulty can still hold the beginning of growth." />

      <section aria-labelledby="individual-therapy" className="service-region wood-individual chapter">
        <div id="services" className="h-0 scroll-mt-28" />
        <div className="region-inner">
          <p className="path-label">Individual</p>
          <h2
            id="individual-therapy"
            tabIndex={-1}
            className="scroll-mt-28 font-display text-5xl sm:text-6xl"
          >
            Individual therapy
          </h2>
          <div className="service-spread reveal">
            <div className="service-copy">
              <div className="service-note">
                <h3 className="subhead">Who it is for</h3>
                <p>
                  I’m someone you can talk to who will listen attentively. This is for you if you want a
                  place to discover how you really feel, and to look at what is causing you difficulty
                  or distress now.
                </p>
              </div>
              <div className="service-note">
                <h3 className="subhead">How it can help</h3>
                <p>
                  I’ll learn what matters to you and concerns you – without judging. We might also
                  explore whether what is difficult now links to experiences in your earlier life. The
                  problems we have with relationships or self-destructive behaviour often have roots in
                  the past. There is time to stay with it, and to see it, rather than to be moved on.
                </p>
              </div>
            </div>
            <figure className="service-figure">
              <Image
                src="/media/garden-room.jpg"
                alt="The timber garden consulting room, with a green roof, among the trees"
                fill
                sizes="(min-width: 1024px) 42vw, 1px"
                className="object-cover object-[center_42%]"
              />
            </figure>
          </div>
          <div className="service-questions reveal">
            <h3 className="subhead">Questions you may have</h3>
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
              <h4>What if it doesn’t have a name?</h4>
              <p>
                Sometimes what you are carrying doesn’t have a label. If that is where you are,
                choose Let’s discuss. We can talk about it. A first conversation is enough, and you
                don’t need a full account of your history.
              </p>
            </div>
          </div>
          <TopicTrail enquiry="individual" topics={individualTopics} />
          <p className="mt-8 text-lg">
            <a className="text-link" href="#contact" data-enquiry="individual">
              Arrange a free first conversation
            </a>
          </p>
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
          <div className="service-spread reveal">
            <div className="service-copy">
              <div className="service-note">
                <h3 className="subhead">Who it is for</h3>
                <p>
                  I also offer ‘couples’ therapy – I use quotation marks because some people wishing to
                  work on their intimate relationships don’t see themselves as being in an exclusive
                  ‘couple’. Relationships are where we have some of the most intense experiences in our
                  lives. They are also where we have the greatest scope to learn and grow, particularly
                  by examining the painful experiences they can give rise to.
                </p>
              </div>
              <div className="service-note">
                <h3 className="subhead">How it can help</h3>
                <p>
                  As therapist, I offer a neutral and contained space where you can look at repetitive
                  patterns of conflict or dissatisfaction in safety, knowing each person’s perspective
                  will be given equal value. Together, you may find new ways of relating that rekindle
                  the intimacy you originally sought. You will certainly reach a deeper understanding of
                  the dynamics of your relationship and what scope there is for change.
                </p>
              </div>
            </div>
            <figure className="service-figure">
              <Image
                src="/media/woodland.jpg"
                alt="Two people sitting together among autumn trees"
                fill
                sizes="(min-width: 1024px) 42vw, 1px"
                className="object-cover object-[center_68%]"
              />
            </figure>
          </div>
          <div className="service-questions reveal">
            <h3 className="subhead">Questions you may have</h3>
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
          <TopicTrail enquiry="couples" topics={couplesTopics} />
          <p className="mt-8 text-lg">
            <a className="text-link" href="#contact" data-enquiry="couples">
              Ask about couples therapy
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="about" className="about-chapter">
        <div className="about-layout">
          <div className="about-intro reveal">
            <Alias id="aboutme2" />
            <h2 id="about" tabIndex={-1} className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl">
              About me
            </h2>
          </div>
          <figure className="about-portrait reveal">
            <Image
              src="/media/portrait.jpg"
              alt="Dermot Cox, photographed outdoors with autumn leaves behind him"
              width={500}
              height={750}
              sizes="272px"
              className="h-auto w-full"
            />
          </figure>
          <div className="about-copy reveal">
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
          </div>
          <div className="about-rest reveal">
            <aside className="accreditation" aria-labelledby="experience">
              <p className="path-label">Registration</p>
              <h3 id="experience" tabIndex={-1} className="subhead scroll-mt-28">
                Training and membership
              </h3>
              <ul className="register-links">
                <li>
                  <a
                    className="register-card"
                    href="https://www.bacp.co.uk/therapists/384871/dermot-cox/great-missenden-hp16?search=Dermot%20cox"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/media/bacp-member-384871.png"
                      alt="BACP Registered Member 384871, MBACP"
                      width={1087}
                      height={200}
                      className="register-mark register-mark-bacp"
                    />
                    <span className="register-go">View the BACP register</span>
                  </a>
                </li>
                <li>
                  <a
                    className="register-card"
                    href="https://www.psychotherapy.org.uk/therapist/Dermot-Cox-IZuHmAAL"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="register-ukcp">
                      <img
                        src="/media/ukcp-logo.svg"
                        alt="UKCP, UK Council for Psychotherapy"
                        width={420}
                        height={228}
                        className="register-mark register-mark-ukcp"
                      />
                      <span className="register-status">Registered Member</span>
                    </span>
                    <span className="register-go">View the UKCP register</span>
                  </a>
                </li>
              </ul>
              <ul className="training-list">
                <li>
                  <span className="training-name">
                    Diplomas in Integrative Transpersonal Counselling and Psychotherapy
                  </span>
                  <span className="training-school">Re-Vision</span>
                </li>
              </ul>
            </aside>
            <p className="mt-8 text-lg">
              <a className="text-link" href="#contact" data-enquiry="general">
                Arrange a free first conversation
              </a>
            </p>
            <div className="about-film">
              <blockquote className="film-quote">
                <p>
                  “I recorded the short video below in my home consulting room so you can get a
                  better sense of me and my approach to therapy.”
                </p>
              </blockquote>
              <div className="film-stage">
                <IntroVideo />
              </div>
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
          <p className="mt-5 max-w-3xl text-xl leading-relaxed">
            {individualPromise} With two people, {couplesPromise}
          </p>
          <ol className="process">
            <li>
              <img
                className="line-mark"
                src="/media/marks/conversation.png"
                alt=""
                width={256}
                height={256}
              />
              <h3 className="subhead">A first conversation</h3>
              <p>
                A free 30-minute conversation, by phone or video, is a chance to meet and to see
                whether working together feels right. It is not a session, and you don’t need to
                arrive with a full account of your history.
              </p>
            </li>
            <li>
              <img
                className="line-mark"
                src="/media/marks/time.png"
                alt=""
                width={256}
                height={256}
              />
              <h3 className="subhead">A time to meet</h3>
              <p>
                Meeting at a regular time each week is generally the most supportive arrangement for
                individual therapy. ‘Couples’ therapy may benefit from greater flexibility in the
                timing of sessions.
              </p>
            </li>
            <li>
              <img
                className="line-mark"
                src="/media/marks/welcome.png"
                alt=""
                width={256}
                height={256}
              />
              <h3 className="subhead">You are welcome</h3>
              <p>
                I recognise and welcome diversity among my clients in all its forms, including
                cultural diversity, Gender Relationship and Sexual Diversity (GRSD and LGBTQIA+) and
                neurodiversity.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section aria-labelledby="fees" className="fees-chapter">
        <div className="fees-sheet chapter">
          <Alias id="pricing" />
          <h2 id="fees" tabIndex={-1} className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl">
            Fees
          </h2>
          <p className="fee-same">The same fee in person or online.</p>
          <div className="fee-cards">
            <article className="fee-card reveal">
              <h3>Individual therapy</h3>
              <p className="fee-figure">£75</p>
              <p className="fee-length">50 minutes</p>
            </article>
            <article className="fee-card reveal">
              <h3>‘Couples’ therapy</h3>
              <p className="fee-figure">£120</p>
              <p className="fee-length">60 minutes</p>
            </article>
          </div>
          <p className="fee-aside">
            A free 30-minute conversation, by phone or video, if you would like to meet and talk
            about working together.
          </p>
        </div>
      </section>

      <OnlineFold>
          <p className="path-label">Online</p>
          <h2
            tabIndex={-1}
            className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl"
          >
            Online sessions
          </h2>
          <div className="service-note">
            <h3 className="subhead">If you are somewhere else</h3>
            <p>
              I offer online sessions for clients who prefer this, or who live in a different area.
              Individual therapy and ‘couples’ therapy can both be held this way. The same fees
              apply as meeting in person.
            </p>
          </div>
          <div className="service-note">
            <h3 className="subhead">A quiet corner is enough</h3>
            <p>
              We meet by video. You will need a place where you will not be interrupted. It does
              not have to be a perfect room. A corner, and a door you can close, is enough. I will
              listen in the same way, and the time is still yours.
            </p>
          </div>
          <div className="service-note">
            <h3 className="subhead">If you can travel</h3>
            <p>
              If the journey is possible, I would encourage you to come in person. The timber room
              in the garden at Little Hampden is a quiet place of its own, set among the trees,
              with the fields and woods beyond, and we can also meet outside.
            </p>
            <p>
              <a className="text-link" href="#in-person">
                See the garden room
              </a>
            </p>
          </div>
          <p className="mt-8 text-lg">
              <a className="text-link" href="#contact" data-enquiry="online">
                Ask about online sessions
              </a>
          </p>
      </OnlineFold>

      <section aria-labelledby="questions" className="questions-chapter">
        <div className="questions-sheet">
          <h2 id="questions" tabIndex={-1} className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl">
            Before you get in touch
          </h2>
          <div className="question-list">
            <div className="reveal">
              <h3>Where do we meet?</h3>
              <p>
                In the garden consulting room in Little Hampden, in the Chilterns, close to Great
                Missenden, or outdoors nearby. {widerAreaSentence} If the journey is too far, we can
                meet online.
              </p>
            </div>
            <div className="reveal">
              <h3>Can we meet online?</h3>
              <p>
                Yes. Online sessions are offered alongside meeting in person, for the same fees.
              </p>
            </div>
            <div className="reveal">
              <h3>How do we begin?</h3>
              <p>
                With a free 30-minute conversation by phone or video, to meet and to talk about
                working together.
              </p>
            </div>
            <div className="reveal">
              <h3>How often do we meet?</h3>
              <p>
                A regular weekly time usually supports individual therapy best. Couples work can be
                more flexible.
              </p>
            </div>
            <div className="reveal">
              <h3>Do you see people from across Buckinghamshire?</h3>
              <p>{buckinghamshireAnswer}</p>
            </div>
            <div className="reveal">
              <h3>What are the fees?</h3>
              <p>
                Individual therapy is £75 for 50 minutes. ‘Couples’ therapy is £120 for 60 minutes.
                The fee is the same in person or online. A first conversation, 30 minutes by phone
                or video, is free.
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
              <PhoneLinks phoneClassName="contact-link" whatsapp={false} />
            </p>
            <WhatsAppInvite />
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

      <section aria-labelledby="finding-us" className="map-chapter">
        <div className="map-sheet">
          <h2
            id="finding-us"
            tabIndex={-1}
            className="scroll-mt-28 font-display text-5xl text-forest sm:text-6xl"
          >
            Little Hampden
          </h2>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed">
            Psychotherapy and counselling in Little Hampden, Buckinghamshire. The postcode is HP16
            9PS.
          </p>
          <dl className="map-facts">
            <div>
              <dt>In person</dt>
              <dd>
                The garden consulting room is in Little Hampden, in the Chilterns, close to Great
                Missenden.
              </dd>
            </div>
            <div>
              <dt>The surrounding area</dt>
              <dd>
                <p>{widerAreaSentence}</p>
              </dd>
            </div>
            <div>
              <dt>Online</dt>
              <dd>When the journey is too far, sessions can be online, for the same fees.</dd>
            </div>
          </dl>
          <div className="map-frame">
            <iframe
              title="Map of Little Hampden, near Great Missenden"
              src={siteConfig.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-lg">
            <a className="text-link" href={siteConfig.mapHref} target="_blank" rel="noopener noreferrer">
              Open this place in Google Maps
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
