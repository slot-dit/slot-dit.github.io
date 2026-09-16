import * as React from "react";
import { withPrefix, type HeadFC, type PageProps } from "gatsby";
import Abstract from "../components/Abstract";
import Affiliation from "../components/Affiliation";
import Author from "../components/Author";
import Citation from "../components/Citation";
import Footer from "../components/Footer";
import Title from "../components/Title";

type MediaItem = { label: string; src: string; alt?: string; accent?: boolean };

type VideoExample = { prompt?: string; items: MediaItem[] };
type VideoDataset = { dataset: string; examples: VideoExample[] };

const qualitativeItems = (dataset: string, sequence: number): MediaItem[] => {
  const root = `/gifs/videogen_qualitative/${dataset}/seq_${sequence}`;
  return [
    { label: "Ground truth", src: `${root}/gt/display.gif` },
    { label: "SlotDiT (ours)", src: `${root}/slotdit/display.gif`, accent: true },
    { label: "DiT + SD-VAE", src: `${root}/sdvae/display.gif` },
    { label: "DiT + VideoVAE", src: `${root}/videovae/display.gif` },
  ];
};

const videoDatasets: VideoDataset[] = [
  {
    dataset: "CLIPort",
    examples: [
      { prompt: "put the gray block in the green bowl", items: qualitativeItems("cliport", 1) },
      { prompt: "put the gray block in the brown bowl", items: qualitativeItems("cliport", 2) },
      { prompt: "put the cyan block in the green bowl", items: qualitativeItems("cliport", 3) },
      { prompt: "put the red block in the brown bowl", items: qualitativeItems("cliport", 4) },
      { prompt: "put the yellow block in the gray bowl", items: qualitativeItems("cliport", 5) },
    ],
  },
  {
    dataset: "LanguageTable-Synthetic",
    examples: [
      { prompt: "slide the moon towards the cube", items: qualitativeItems("lt_syn", 1) },
      { prompt: "slide the green star next to the blue cube", items: qualitativeItems("lt_syn", 2) },
      { prompt: "put the red moon next to the yellow pentagon", items: qualitativeItems("lt_syn", 3) },
      { prompt: "push the pentagon towards the blue block", items: qualitativeItems("lt_syn", 4) },
      { prompt: "slide the yellow block to the blue block", items: qualitativeItems("lt_syn", 5) },
    ],
  },
  {
    dataset: "LanguageTable-Real",
    examples: [
      { prompt: "push the yellow hexagon to the top center of the board", items: qualitativeItems("lt_real", 1) },
      { prompt: "push the yellow hexagon towards the center left", items: qualitativeItems("lt_real", 2) },
      { prompt: "move the blue triangle left to the red circle", items: qualitativeItems("lt_real", 3) },
      { prompt: "place the green star at the top of the yellow heart", items: qualitativeItems("lt_real", 4) },
      { prompt: "move the red circle to the right of the board", items: qualitativeItems("lt_real", 5) },
    ],
  },
  {
    dataset: "BridgeData V2",
    examples: [
      { prompt: "move the corn to the stove", items: qualitativeItems("bridge", 1) },
      { prompt: "take the orange cloth from the washing machine and put it in the white basket", items: qualitativeItems("bridge", 2) },
      { prompt: "put the orange cloth on the upper side of the left burner", items: qualitativeItems("bridge", 3) },
      { prompt: "open the drawer", items: qualitativeItems("bridge", 4) },
      { prompt: "switch pot to right burner", items: qualitativeItems("bridge", 5) },
    ],
  },
];

const controllabilityExamples = [
  {
    dataset: "CLIPort",
    prompt: "put the yellow block in the blue bowl",
    changedPrompt: "put the red block in the blue bowl",
    items: [
      { label: "Ground truth", src: "/gifs/controllability/cliport/gt/target_frames.gif" },
      { label: "Original instruction", src: "/gifs/controllability/cliport/orig_pred/display.gif", accent: true },
      { label: "Changed instruction", src: "/gifs/controllability/cliport/changed_prompt_pred/predicted_frames.gif", accent: true },
    ],
  },
  {
    dataset: "LanguageTable-Synthetic",
    prompt: "move the star to the blue cube",
    changedPrompt: "move the pentagon to the blue cube",
    items: [
      { label: "Ground truth", src: "/gifs/controllability/lt_syn/seq_1/gt/target_frames.gif" },
      { label: "Original instruction", src: "/gifs/controllability/lt_syn/seq_1/orig_pred/predicted_frames.gif", accent: true },
      { label: "Changed instruction", src: "/gifs/controllability/lt_syn/seq_1/changed_prompt_pred/predicted_frames.gif", accent: true },
    ],
  },
  {
    dataset: "LanguageTable-Real",
    prompt: "slide the green star on top of yellow hexagon",
    changedPrompt: "slide the red circle on top of yellow hexagon",
    items: [
      { label: "Ground truth", src: "/gifs/controllability/lt_real/gt/target_frames.gif" },
      { label: "Original instruction", src: "/gifs/controllability/lt_real/orig_pred/predicted_frames.gif", accent: true },
      { label: "Changed instruction", src: "/gifs/controllability/lt_real/changed_prompt_pred/predicted_frames.gif", accent: true },
    ],
  },
  {
    dataset: "BridgeData V2 - Example 1",
    prompt: "move the pot to the cooker",
    changedPrompt: "move the yellow object to the cooker",
    items: [
      { label: "Ground truth", src: "/gifs/controllability/bridge/seq_1/gt/target_frames.gif" },
      { label: "Original instruction", src: "/gifs/controllability/bridge/seq_1/orig_pred/predicted_frames.gif", accent: true },
      { label: "Changed instruction", src: "/gifs/controllability/bridge/seq_1/changed_prompt_pred/predicted_frames.gif", accent: true },
    ],
  },
  {
    dataset: "BridgeData V2 - Example 2",
    prompt: "move the corn to the stove",
    changedPrompt: "move the lit to the stove",
    items: [
      { label: "Ground truth", src: "/gifs/controllability/bridge/seq_2/gt/target_frames.gif" },
      { label: "Original instruction", src: "/gifs/controllability/bridge/seq_2/orig_pred/predicted_frames.gif", accent: true },
      { label: "Changed instruction", src: "/gifs/controllability/bridge/seq_2/changed_prompt_pred/predicted_frames.gif", accent: true },
    ],
  },
];

const objectCentricExamples = [
  { title: "BridgeData V2 · Example 1", sequence: "seq_1", objects: ["03", "04", "05", "07"] },
  { title: "BridgeData V2 · Example 2", sequence: "seq_2", objects: ["02", "00", "04", "07"] },
];

const Article: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="article-shell">{children}</div>
);

const ResourceLinks = () => (
  <nav className="resource-links" aria-label="Project resources">
    <a
      className="resource-link no-underline-effect"
      href="https://github.com/Gjergj121/SlotDiT"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span aria-hidden="true">&lt;/&gt;</span> Code
    </a>
    <a
      className="resource-link no-underline-effect"
      href="https://arxiv.org/abs/2609.17414"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span aria-hidden="true">&#128196;</span> Paper
    </a>
    <a className="resource-link no-underline-effect" href="#citation">
      <span aria-hidden="true">&#8220;</span> BibTeX
    </a>
  </nav>
);

const SectionHeading: React.FC<{ eyebrow?: string; children: React.ReactNode }> = ({ eyebrow, children }) => (
  <header className="section-heading">
    {eyebrow && <span>{eyebrow}</span>}
    <h2>{children}</h2>
  </header>
);

const PaperFigure: React.FC<{ src: string; alt: string; caption: React.ReactNode; className?: string }> = ({
  src, alt, caption, className = "",
}) => (
  <figure className={`paper-figure ${className}`}>
    <img src={withPrefix(src)} alt={alt} loading="lazy" />
    <figcaption>{caption}</figcaption>
  </figure>
);

const ResultTable: React.FC<{ src: string; alt: string; caption: React.ReactNode }> = ({ src, alt, caption }) => (
  <figure className="result-table">
    <a href={withPrefix(src)} target="_blank" rel="noreferrer" className="no-underline-effect">
      <img src={withPrefix(src)} alt={alt} loading="lazy" />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>
);

const MediaGrid: React.FC<{ items: MediaItem[]; className?: string }> = ({ items, className = "" }) => (
  <div className={`media-grid ${className}`} style={{ "--media-columns": items.length } as React.CSSProperties}>
    {items.map((item) => (
      <figure className={`media-cell ${item.accent ? "media-cell--accent" : ""}`} key={item.src}>
        <figcaption>{item.label}</figcaption>
        <img src={withPrefix(item.src)} alt={item.alt ?? item.label} loading="lazy" />
      </figure>
    ))}
  </div>
);

const ExampleBlock: React.FC<{ title: string; prompt?: string; changedPrompt?: string; items: MediaItem[] }> = ({
  title, prompt, changedPrompt, items,
}) => (
  <article className="example-block">
    <div className="example-block__header">
      <h4>{title}</h4>
      {prompt && <p><span>Instruction</span> “{prompt}”</p>}
      {changedPrompt && <p className="changed-prompt"><span>Changed</span> “{changedPrompt}”</p>}
    </div>
    <MediaGrid items={items} />
  </article>
);

const QualitativeCarousel: React.FC<VideoDataset> = ({ dataset, examples }) => {
  const [current, setCurrent] = React.useState(0);
  const example = examples[current];
  const previous = () => setCurrent((index) => (index - 1 + examples.length) % examples.length);
  const next = () => setCurrent((index) => (index + 1) % examples.length);

  return (
    <article className="example-block qualitative-carousel" aria-roledescription="carousel" aria-label={`${dataset} examples`}>
      <div className="example-block__header qualitative-carousel__header">
        <button type="button" className="qualitative-carousel__arrow" onClick={previous} aria-label={`Previous ${dataset} example`}>
          <span aria-hidden="true">&#8249;</span>
        </button>
        <div className="qualitative-carousel__copy" aria-live="polite">
          <div className="qualitative-carousel__title">
            <h4>{dataset}</h4>
            <span>{current + 1} / {examples.length}</span>
          </div>
          {example.prompt && <p><span>Instruction</span> “{example.prompt}”</p>}
        </div>
        <button type="button" className="qualitative-carousel__arrow" onClick={next} aria-label={`Next ${dataset} example`}>
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>
      <MediaGrid items={example.items} />
    </article>
  );
};

const ObjectCentricExample: React.FC<{ title: string; sequence: string; objects: string[] }> = ({
  title, sequence, objects,
}) => {
  const root = `/gifs/object_centric_preds/${sequence}`;
  const overview: MediaItem[] = [
    { label: "Ground truth", src: `${root}/target_frames.gif` },
    { label: "SlotDiT prediction", src: `${root}/predicted_frames.gif`, accent: true },
    { label: "Slot masks", src: `${root}/slot_masks_rgb.gif`, accent: true },
  ];
  const objectItems: MediaItem[] = objects.map((object, index) => ({
    label: `Object ${index + 1}`,
    src: `${root}/obj_${object}.gif`,
  }));

  return (
    <article className="example-block object-example">
      <div className="example-block__header">
        <h4>{title}</h4>
        <p>Instruction-conditioned object-centric rollout</p>
      </div>
      <MediaGrid items={overview} className="media-grid--overview" />
      <MediaGrid items={objectItems} className="media-grid--objects" />
    </article>
  );
};

export const Head: HeadFC = () => (
  <>
    <title>SlotDiT: Object-Centric Representations for Diffusion Transformers</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="SlotDiT predicts future scene dynamics in a compact object-centric slot space." />
  </>
);

const IndexPage: React.FC<PageProps> = () => (
  <div>
    <main>
      <Article>
        <header className="hero">
          <Title>SlotDiT: Object-Centric Representations for Diffusion Transformers</Title>
          <div className="flex flex-wrap justify-center text-xl mb-3 mt-0 leading-none">
            <Author website="https://www.linkedin.com/in/gjergj-plepi-928a4b196/">Gjergj Plepi</Author>
            <Author website="https://www.ais.uni-bonn.de/behnke/" lastAuthor>Sven Behnke</Author>
          </div>
          <div className="flex flex-wrap justify-center text-xl mb-5 mt-0 leading-none">
            <Affiliation website="https://www.ais.uni-bonn.de/index.html">
              Autonomous Intelligent Systems, University of Bonn
            </Affiliation>
          </div>
          <div className="flex flex-wrap justify-center text-xl mb-6 mt-0 leading-none">
            <strong>British Machine Vision Conference (BMVC) 2026</strong>
          </div>
          <ResourceLinks />
        </header>

        <section className="content-section abstract-section" aria-labelledby="abstract-title">
          <SectionHeading><span id="abstract-title">Abstract</span></SectionHeading>
          <Abstract>
            <p>
              Text-conditioned latent diffusion models are powerful video generators and promising backbones for
              robotic applications, but common pixel- or VAE-based latents prioritize reconstruction fidelity and lack explicit
              semantic structure. Object-centric slots instead decompose a scene into compact representations of its entities.
            </p>
            <p>
              We introduce <strong>SlotDiT</strong>, a text-guided Diffusion Transformer operating in a slot-based latent space.
              Given one reference image, it extracts object-centric slots and, conditioned on the text instruction and scene
              context, autoregressively denoises future slot trajectories, enabling the prediction of future scene dynamics.
            </p>
            <p>
              We compare slot, VAE-based, and semantics-aligned latents within one unified DiT setup across four robotic
              datasets. SlotDiT delivers competitive visual quality, consistently stronger task completion, leading
              robot-control performance, and substantially faster inference.
            </p>
          </Abstract>
        </section>

        <section className="content-section" aria-labelledby="slotdit-title">
          <SectionHeading eyebrow="Method"><span id="slotdit-title">SlotDiT</span></SectionHeading>
          <div className="section-copy">
            <p>
              Given a reference image and language instruction, SlotDiT first encodes the scene into a compact set of
              object-centric slots. Conditioned on the instruction and observed slots, the diffusion transformer
              iteratively denoises future slot trajectories from Gaussian noise.
            </p>
            <p>
              The latest predicted slots are reused as context for autoregressive generation, and a frozen
              object-centric decoder can render the resulting trajectories as future frames.
            </p>
          </div>
          <PaperFigure
            src="/images/pipeline_v2.png"
            alt="SlotDiT pipeline from a reference image and language instruction to future object-centric slots and decoded frames"
            className="paper-figure--method"
            caption={<><strong>Figure 1(a).</strong> SlotDiT parses the reference image into slots and autoregressively denoises future slot trajectories conditioned on language and scene context.</>}
          />
        </section>

        <section className="content-section evaluation-section" aria-labelledby="evaluation-title">
          <SectionHeading eyebrow="Experiments"><span id="evaluation-title">Evaluation</span></SectionHeading>
          <div className="split-feature">
            <div className="section-copy">
              <p>
                We isolate the effect of the latent space by comparing object-centric slots with VAE-based and
                semantics-aligned representations under the same DiT architecture, training procedure, and inference scheme.
              </p>
              <p>
                Evaluation comprises two distinct tasks: <strong>text-guided video generation</strong> on CLIPort,
                LanguageTable-Synthetic, LanguageTable-Real, and BridgeData V2; and <strong>robot control</strong> on
                CLIPort and LanguageTable-Synthetic.
              </p>
            </div>
            <PaperFigure
              src="/images/comp_representations_v2.png"
              alt="VAE-based, semantics-aligned, and object-centric slot latent representations"
              caption={<><strong>Figure 1(b).</strong> Latent spaces compared in the unified DiT study.</>}
            />
          </div>

          <div className="task-section" aria-labelledby="video-generation-title">
            <SectionHeading eyebrow="Evaluation task 01"><span id="video-generation-title">Text-Guided Video Generation</span></SectionHeading>
            <div className="section-copy">
              <p>
                SlotDiT outperforms all the VAE-based baselines by achieving the highest task-success rate on CLIPort (87.8%), LanguageTable-Synthetic (79.7%),
                and LanguageTable-Real (64.6%), while remaining competitive on BridgeData V2 (57.6%). VAE-based baselines
                can obtain stronger perceptual scores, but visual fidelity alone does not reliably indicate instruction
                following or task completion.
              </p>
            </div>
            <ResultTable
              src="/tables/video_generation_results.png"
              alt="Text-guided video generation results on four robotic datasets"
              caption={<>Text-guided video generation results at prediction horizon of 29 future frames. Click to view full size.</>}
            />

            <div className="qualitative-intro">
              <h3>Qualitative comparison</h3>
              <p>
                These rollouts illustrate the metric–task gap: visually plausible baselines may preserve appearance yet
                fail to execute the instruction, while SlotDiT models the task-relevant object dynamics and its predictions
                correctly illustrate the completed task.
              </p>
            </div>
            <div className="examples-stack">
                {videoDatasets.map((dataset) => (
                  <QualitativeCarousel key={dataset.dataset} {...dataset} />
                ))}
            </div>
          </div>

          <div className="task-section" aria-labelledby="robot-control-title">
            <SectionHeading eyebrow="Evaluation task 02"><span id="robot-control-title">Robot Control</span></SectionHeading>
            <div className="section-copy">
              <p>
                For the robot control setting, we use inverse dynamics models (IDMs) to map predicted latents to actions. SlotDiT reaches <strong>73.0%</strong> success
                in open-loop robot control on CLIPort and <strong>74.5%</strong> in the in-distribution closed-loop LanguageTable-Synthetic setting, leading
                all learned predictors and nearly matching the GT slots oracle.
              </p>
              <p>
                It remains strongest in the LanguageTable-Synthetic's out-of-distribution scenarios—harder eight-block scenes and unseen instruction
                templates—showing that object-centric dynamics retain task-relevant information beyond training.
              </p>
            </div>
            <ResultTable
              src="/tables/robot_control_results.png"
              alt="Robot-control success on CLIPort and LanguageTable-Synthetic robustness settings"
              caption={<>Robot-control success. SlotDiT leads the learned predictors and is close to the ground-truth-slot oracle in distribution. Click to view full size.</>}
            />
          </div>
        </section>

        <section className="content-section" aria-labelledby="efficiency-title">
          <SectionHeading eyebrow="Model analysis"><span id="efficiency-title">Efficiency</span></SectionHeading>
          <div className="split-feature split-feature--reverse">
            <PaperFigure
              src="/images/efficiency_task_success_v2.png"
              alt="Average task success versus inference throughput for SlotDiT and latent-space baselines"
              caption={<><strong>Figure 1(c).</strong> SlotDiT combines the highest average task completion with the fastest inference.</>}
            />
            <div className="section-copy">
              <p>
                SlotDiT represents each frame with only <strong>10 slot tokens</strong>, compared with 256 tokens for
                the alternative latents. It reaches <strong>9.33 FPS</strong>, a <strong>5.68&times; speedup</strong> over
                DiT + SD-VAE, with most of the gain coming from diffusion sampling, highlighting the efficiency gains from the compact and semantic object-centric latent space.
              </p>
            </div>
          </div>
          <ResultTable
            src="/tables/efficiency_results.png"
            alt="Inference time, throughput, and token-count comparison"
            caption={<>Inference efficiency on CLIPort. Compact slot trajectories substantially reduce diffusion sampling cost. Click to view full size.</>}
          />
        </section>

        <section className="content-section" aria-labelledby="controllability-title">
          <SectionHeading eyebrow="Model analysis"><span id="controllability-title">Controllability</span></SectionHeading>
          <div className="section-copy">
            <p>
              Given the same initial observation, SlotDiT generates distinct future trajectories for two different instructions, while preserving the overall scene layout and object identities. In both
              cases, SlotDiT is able to identify the new objects and correctly applies the described motion, seamlessly adapting to the new text instruction.
            </p>
          </div>
          <div className="examples-stack">
            {controllabilityExamples.map((example) => (
              <div
                key={`${example.dataset}-${example.prompt}`}
                className={example.dataset === "LanguageTable-Real" ? "lt-real-controllability" : ""}
              >
                <ExampleBlock title={example.dataset} prompt={example.prompt}
                  changedPrompt={example.changedPrompt} items={example.items} />
              </div>
            ))}
          </div>
        </section>

        <section className="content-section" aria-labelledby="object-centric-title">
          <SectionHeading eyebrow="Inside the representation"><span id="object-centric-title">Object-Centric Behaviour</span></SectionHeading>
          <div className="section-copy">
            <p>
              SlotDiT models scene dynamics through persistent object-level representations. The masks show the
              decomposition of each predicted frame, while the individual slot reconstructions reveal how individual
              scene entities are represented and how they evolve over time.
            </p>
          </div>
          <div className="examples-stack">
            {objectCentricExamples.map((example) => <ObjectCentricExample key={example.sequence} {...example} />)}
          </div>
        </section>

        <section className="content-section findings-section" aria-labelledby="findings-title">
          <SectionHeading eyebrow="Conclusion"><span id="findings-title">Key Findings</span></SectionHeading>
          <ul className="key-findings">
            <li>Object-centric DiT latents improve instruction following and task completion while retaining competitive visual quality.</li>
            <li>Perceptual video metrics alone do not measure whether a robotic instruction was actually completed successfully.</li>
            {/* <li>SlotDiT leads all learned predictors on the robot control setting and remains more robust to novel scenes and instruction templates.</li> */}
            <li>Compact object-centric slots make diffusion inference substantially more efficient than dense alternatives.</li>
            <li>Object-centric structure proves to be a powerful inductive bias for diffusion-based generative modeling in robotic environments.</li>
          </ul>
        </section>

        <section id="citation" className="content-section citation-section"><Citation /></section>
      </Article>
      <Footer githubUrl="https://github.com/Gjergj121" linkedInUrl="https://www.linkedin.com/in/gjergj-plepi-928a4b196/" />
    </main>
  </div>
);

export default IndexPage;
