import Image from "next/image";
import { EnquiryForm } from "@/components/enquiry-form";
import { IntroVideo } from "@/components/intro-video";
import { siteConfig } from "@/lib/site";

function Alias({ id }: { id: string }) {
  return <div id={id} className="h-0 scroll-mt-28" />;
}

export default function HomePage() {
  return (
    <main>
      <section aria-labelledby="top" className="bg-ivory">
        <div className="grid min-h-[calc(100svh-4.5rem)] grid-rows-[minmax(16rem,1fr)_auto] lg:min-h-[calc(100svh-5rem)]">
          <div className="relative min-h-64">
            <Image
              src="/media/woodland.jpg"
              alt="Two people sitting together on a fallen tree in autumn woodland"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_58%]"
            />
          </div>
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="mx-auto max-w-3xl">
              <Alias id="welcome" />
              <Alias id="dermot-cox-counselling" />
              <Alias id="psychotherapy" />
              <Alias id="counselling" />
              <h1 id="top" tabIndex={-1} className="scroll-mt-28 font-display text-forest">
                <span className="block text-5xl leading-none sm:text-6xl">Dermot Cox</span>
                <span className="mt-4 block max-w-2xl text-3xl leading-snug font-normal text-ink sm:text-4xl">
                  Psychotherapy and counselling for individuals and couples, in person in Little
                  Hampden, near Great Missenden.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed">
                A quiet place to talk, in the garden consulting room and the countryside around the
                village.
              </p>
              <a href="#contact" className="submit-button mt-8 inline-flex items-center no-underline">
                Arrange a first conversation
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-6 pt-4 pb-20 sm:px-10 sm:pb-28">
          <div className="prose-copy max-w-xl text-xl leading-relaxed">
            <p>
              You may need support because there are no people in your life you feel able to share
              deeply with. You may feel pain that won’t go away. Attempts to distract yourself may
              no longer be working. It may be time to look inside and try and see what’s going on.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="about" className="border-t border-line bg-ivory-deep">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[16rem_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:py-28">
          <div className="lg:col-start-2">
            <Alias id="aboutme2" />
            <p className="section-kicker">About</p>
            <h2 id="about" tabIndex={-1} className="scroll-mt-28 mt-3 font-display text-5xl text-forest">
              About me
            </h2>
          </div>
          <figure className="mx-auto w-full max-w-[16rem] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0">
            <Image
              src="/media/portrait.jpg"
              alt="Dermot Cox, photographed outdoors with autumn leaves behind him"
              width={500}
              height={750}
              sizes="256px"
              className="h-auto w-full"
            />
          </figure>
          <div className="max-w-xl lg:col-start-2">
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
                I also trained as a bereavement volunteer with Cruse and work with people
                experiencing intense grief and loss.
              </p>
              <p>
                Being connected to nature is important to me. I live in the Chiltern Hills in
                Buckinghamshire. Before becoming a therapist, I worked as a marketing consultant in
                professional and financial services. I’m familiar with the tension this world
                creates between business success and personal life. I know the pressures it puts on
                building and sustaining personal relationships.
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
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-20 sm:px-10">
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
      </section>

      <section aria-labelledby="services" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
          <p className="section-kicker">Services</p>
          <h2 id="services" tabIndex={-1} className="scroll-mt-28 mt-3 max-w-2xl font-display text-5xl text-forest">
            Individual and couples work
          </h2>
          <p className="mt-6 max-w-xl text-xl leading-relaxed">
            Both take place in the same practice. The shape of the work is different, so each is
            described on its own.
          </p>
          <div className="mt-12 grid gap-12 border-t border-line pt-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl text-forest">
                <a href="#individual-therapy" className="text-link">
                  Individual therapy
                </a>
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed">
                Time for one person to look at what is difficult now, and at what may sit behind
                it.
              </p>
            </div>
            <div>
              <h3 className="font-display text-3xl text-forest">
                <a href="#couples-therapy" className="text-link">
                  ‘Couples’ therapy
                </a>
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed">
                A place for two people working on an intimate relationship, including people who
                don’t see themselves as an exclusive couple.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="individual-therapy" className="border-t border-line bg-ivory-deep">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10 lg:py-28">
          <p className="section-kicker">Individual therapy</p>
          <h2
            id="individual-therapy"
            tabIndex={-1}
            className="scroll-mt-28 mt-3 font-display text-5xl text-forest"
          >
            Someone to talk to
          </h2>
          <div className="prose-copy mt-6 max-w-xl text-xl leading-relaxed">
            <p>
              I’m someone you can talk to who will listen attentively. I’ll learn what matters to
              you and concerns you – without judging. I provide a space where you can discover how
              you really feel. We’ll look at what’s causing you difficulty or distress now. We
              might also explore whether that links to experiences in your earlier life. The
              problems we have with relationships or self-destructive behaviour often have roots in
              the past.
            </p>
            <p>
              People also bring grief and loss, strain in their relationships, or the pressure that
              work can place on a personal life.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="couples-therapy" className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10 lg:py-28">
          <p className="section-kicker">Couples and relationships</p>
          <h2
            id="couples-therapy"
            tabIndex={-1}
            className="scroll-mt-28 mt-3 font-display text-5xl text-forest"
          >
            ‘Couples’ therapy
          </h2>
          <div className="prose-copy mt-6 max-w-xl text-xl leading-relaxed">
            <p>
              I also offer ‘couples’ therapy – I use quotation marks because some people wishing to
              work on their intimate relationships don’t see themselves as being in an exclusive
              ‘couple’.
            </p>
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
            <p>
              I’m comfortable in the world of conscious sexuality and work with clients exploring
              their experiences and feelings around sexual identity and open relating/polyamory.
            </p>
          </div>
          <p className="mt-8 text-lg">
            <a className="text-link" href="#contact">
              Ask about couples work
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="approach" className="border-t border-line bg-ivory-deep">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10 lg:py-28">
          <Alias id="working-together" />
          <Alias id="workingtogether" />
          <p className="section-kicker">Approach</p>
          <h2 id="approach" tabIndex={-1} className="scroll-mt-28 mt-3 font-display text-5xl text-forest">
            How we can work together
          </h2>
          <div className="prose-copy mt-6 max-w-xl text-xl leading-relaxed">
            <p>
              A free 30-minute conversation, by phone or video, is a chance to meet and to see
              whether working together feels right. It is not a session, and you don’t need to
              arrive with a full account of your history.
            </p>
            <p>
              Meeting at a regular time each week is generally the most supportive arrangement for
              individual therapy. ‘Couples’ therapy may benefit from greater flexibility in the
              timing of sessions.
            </p>
            <p>
              I recognise and welcome diversity among my clients in all its forms, including
              cultural diversity, Gender Relationship and Sexual Diversity (GRSD and LGBTQIA+) and
              neurodiversity.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="experience" className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10 lg:py-28">
          <p className="section-kicker">Experience</p>
          <h2
            id="experience"
            tabIndex={-1}
            className="scroll-mt-28 mt-3 font-display text-5xl text-forest"
          >
            Training and membership
          </h2>
          <div className="prose-copy mt-6 max-w-xl text-xl leading-relaxed">
            <p>
              I have Diplomas in Integrative Transpersonal Counselling and Psychotherapy from
              Re-Vision. I’m a Registered Member of BACP (British Association for Counselling and
              Psychotherapy) and UKCP (UK Council for Psychotherapy). I abide by the codes of ethics
              of both organisations.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="in-person" className="border-t border-line bg-ivory-deep">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-16 lg:py-28">
          <div className="lg:col-start-2">
            <p className="section-kicker">Little Hampden</p>
            <h2
              id="in-person"
              tabIndex={-1}
              className="scroll-mt-28 mt-3 font-display text-5xl text-forest"
            >
              Visiting in person
            </h2>
          </div>
          <figure className="relative aspect-[3/2] overflow-hidden lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <Image
              src="/media/garden-room.jpg"
              alt="The timber garden consulting room, with a green roof, among trees and fallen leaves"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </figure>
          <div className="max-w-xl lg:col-start-2">
            <div className="prose-copy text-xl leading-relaxed">
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
            <p className="mt-8 text-lg">
              <a className="text-link" href="#contact">
                Ask about visiting
              </a>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="online" className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 lg:py-16">
          <p className="section-kicker">Also available</p>
          <h2 id="online" tabIndex={-1} className="scroll-mt-28 mt-3 font-display text-4xl text-forest">
            Online sessions
          </h2>
          <p className="mt-5 max-w-xl text-xl leading-relaxed">
            I offer online sessions for clients who prefer this or who live in a different area.
            The same fees apply. Most of the practice is in person, in Little Hampden.
          </p>
        </div>
      </section>

      <section aria-labelledby="fees" className="border-t border-line">
        <figure className="relative h-[38vh] min-h-56 max-h-[28rem]">
          <Image
            src="/media/autumn-sky.jpg"
            alt="Looking up through yellow and green autumn leaves"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </figure>
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10 lg:py-28">
          <Alias id="pricing" />
          <p className="section-kicker">Fees</p>
          <h2 id="fees" tabIndex={-1} className="scroll-mt-28 mt-3 font-display text-5xl text-forest">
            Fees
          </h2>
          <p className="mt-4 text-lg">Fees per session, in person or online.</p>
          <dl className="mt-8 max-w-xl divide-y divide-line border-y border-line">
            <div className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline">
              <dt className="font-display text-3xl text-forest">Individual therapy</dt>
              <dd className="text-xl">£75 · 50 minutes</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline">
              <dt className="font-display text-3xl text-forest">‘Couples’ therapy</dt>
              <dd className="text-xl">£120 · 60 minutes</dd>
            </div>
          </dl>

          <h3 id="questions" tabIndex={-1} className="scroll-mt-28 mt-16 font-display text-4xl text-forest">
            A few practical questions
          </h3>
          <div className="mt-8 max-w-xl space-y-8 text-lg leading-relaxed">
            <div>
              <h4 className="font-display text-2xl text-forest">Where do we meet?</h4>
              <p className="mt-2">
                In the garden consulting room in Little Hampden, near Great Missenden, or outdoors
                nearby. The room is not in Great Missenden itself.
              </p>
            </div>
            <div>
              <h4 className="font-display text-2xl text-forest">Can we meet online?</h4>
              <p className="mt-2">
                Yes, if you prefer it or you live further away. In-person sessions are the heart of
                the practice.
              </p>
            </div>
            <div>
              <h4 className="font-display text-2xl text-forest">How do we begin?</h4>
              <p className="mt-2">
                With a free 30-minute conversation by phone or video, to meet and to talk about
                working together.
              </p>
            </div>
            <div>
              <h4 className="font-display text-2xl text-forest">How often do we meet?</h4>
              <p className="mt-2">
                A regular weekly time usually supports individual therapy best. Couples work can be
                more flexible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact" className="border-t border-line bg-ivory-deep">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:py-28">
          <div className="max-w-md">
            <p className="section-kicker">Contact</p>
            <h2 id="contact" tabIndex={-1} className="scroll-mt-28 mt-3 font-display text-5xl text-forest">
              Get in touch
            </h2>
            <p className="mt-6 text-xl leading-relaxed">
              I offer a free 30-minute discussion by phone or video call if you’d like to meet me
              and discuss working together.
            </p>
            <p className="mt-6 text-xl">
              <a className="text-link" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-xl">
              <a className="text-link" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-6 text-lg leading-relaxed">
              Little Hampden, close to Great Missenden, Buckinghamshire.
            </p>
          </div>
          <div>
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
