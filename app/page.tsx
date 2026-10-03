import Image from "next/image";
import { EnquiryForm } from "@/components/enquiry-form";
import { HeroSlider } from "@/components/hero-slider";
import { IntroVideo } from "@/components/intro-video";
import { siteConfig } from "@/lib/site";

function Alias({ id }: { id: string }) {
  return <div id={id} className="h-0 scroll-mt-28" />;
}

function Further({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="further" open>
      <summary>{summary}</summary>
      <div className="further-body prose-copy text-xl leading-relaxed">{children}</div>
    </details>
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
              <span className="block text-[3.25rem] leading-none sm:text-6xl lg:text-7xl">Dermot Cox</span>
              <span className="mt-4 block text-[1.65rem] leading-snug font-normal text-ink sm:text-3xl lg:text-[2.15rem]">
                Psychotherapy and counselling for individuals and couples, in person in Little
                Hampden, near Great Missenden, and online.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-xl leading-relaxed">
              A quiet place to talk, in the garden consulting room, in the countryside around the
              village, or online.
            </p>
            <a href="#contact" className="submit-button hero-cta mt-8 inline-flex items-center no-underline">
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
          <p className="mt-6 max-w-2xl text-xl leading-relaxed">
            I’m someone you can talk to who will listen attentively.
          </p>
          <Further summary="What this space is for">
            <p>
              I’ll learn what matters to you and concerns you – without judging. I provide a space
              where you can discover how you really feel.
            </p>
            <p>
              We’ll look at what’s causing you difficulty or distress now. We might also explore
              whether that links to experiences in your earlier life. The problems we have with
              relationships or self-destructive behaviour often have roots in the past.
            </p>
            <p>
              You don’t have to arrive with the difficulty already named. There is time to stay with
              it, and to see it, rather than to be moved on.
            </p>
          </Further>
          <div className="region-split">
            <article>
              <h3 id="grief" tabIndex={-1} className="scroll-mt-28 font-display text-4xl text-forest">
                Grief and loss
              </h3>
              <p className="mt-4 text-xl leading-relaxed">
                I also trained as a bereavement volunteer with Cruse and work with people
                experiencing intense grief and loss.
              </p>
              <Further summary="If this is what you are carrying">
                <p>
                  If intense grief or another loss is what brings you, that can be the centre of the
                  work. It does not have to be set aside so that we can talk about something else.
                  There is room for how the loss actually feels.
                </p>
              </Further>
            </article>
            <article>
              <h3
                id="work-and-life"
                tabIndex={-1}
                className="scroll-mt-28 font-display text-4xl text-forest"
              >
                Work and a personal life
              </h3>
              <p className="mt-4 text-xl leading-relaxed">
                Before becoming a therapist, I worked as a marketing consultant in professional and
                financial services. I’m familiar with the tension this world creates between business
                success and personal life. I know the pressures it puts on building and sustaining
                personal relationships.
              </p>
              <Further summary="The world I knew before this work">
                <p>
                  I know that tension from the inside. Business success in professional and financial
                  services can pull against a personal life, and it can make it harder to build a
                  relationship and to sustain one. If that pressure is familiar, we can look at it
                  directly.
                </p>
              </Further>
            </article>
          </div>
          <details className="topic-list">
            <summary>Topics people often bring</summary>
            <p>
              These are among the most common reasons people look for individual therapy. Grief and
              loss, and work and a personal life, are written out above.
            </p>
            <ul>
              <li>
                <a href="#grief">Grief and loss</a>
              </li>
              <li>
                <a href="#work-and-life">Work and a personal life</a>
              </li>
              <li>Anxiety</li>
              <li>Depression and low mood</li>
              <li>Stress</li>
              <li>Relationship difficulties</li>
              <li>Self-esteem</li>
              <li>Life changes</li>
            </ul>
          </details>
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
          <p className="mt-6 max-w-2xl text-xl leading-relaxed">
            I also offer ‘couples’ therapy – I use quotation marks because some people wishing to
            work on their intimate relationships don’t see themselves as being in an exclusive
            ‘couple’.
          </p>
          <Further summary="A contained place for both of you">
            <p>
              Relationships are where we have some of the most intense experiences in our lives.
              They are also where we have the greatest scope to learn and grow, particularly by
              examining the painful experiences they can give rise to. As therapist, I offer a
              neutral and contained space where you can look at repetitive patterns of conflict or
              dissatisfaction in safety, knowing each person’s perspective will be given equal
              value.
            </p>
            <p>
              Together, you may find new ways of relating that rekindle the intimacy you originally
              sought. You will certainly reach a deeper understanding of the dynamics of your
              relationship and what scope there is for change.
            </p>
          </Further>
          <article className="relating-note">
            <h3 id="relating" tabIndex={-1} className="scroll-mt-28 font-display text-4xl">
              Sexual identity and open relating
            </h3>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed">
              I’m comfortable in the world of conscious sexuality and work with clients exploring
              their experiences and feelings around sexual identity and open relating/polyamory.
            </p>
            <Further summary="Speaking about this here">
              <p>
                This sits inside the ‘couples’ work. It is not a separate service. Those experiences
                and feelings can be spoken about here, and they will be met without judgement.
              </p>
            </Further>
          </article>
          <details className="topic-list">
            <summary>Topics people often bring</summary>
            <p>
              These are among the most common reasons people look for couples therapy. Conflict,
              intimacy, and sexual identity are already in the writing above.
            </p>
            <ul>
              <li>Communication</li>
              <li>Conflict</li>
              <li>Intimacy</li>
              <li>Trust</li>
              <li>Growing apart</li>
              <li>
                <a href="#relating">Sexual identity and open relating</a>
              </li>
            </ul>
          </details>
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
