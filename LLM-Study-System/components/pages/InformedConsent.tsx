import InformedConsentCheckbox from "../InformedConsentCheckbox";
import { useICStore } from "@/src/informationconsent";
import NextPageButton from "../buttons/NextPageButton";
import { useEffect, useRef } from "react";

export default function InformedConsent() {

    const { accept_ic } = useICStore();
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (accept_ic && buttonRef.current) {
            buttonRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [accept_ic]);

    return (
        <>
            <h1 className="text-center mb-3">Informed Consent of Study Participation</h1>
            <div className="px-5 flex justify-center">
                <div className="task-box mb-3 max-w-prose place-items-center px-5 border border-neutral-900 text-center">
                    <p>
                        You are invited to participate in the online study, which investigates behavior with a Generative (chat based)
                        Information System. The study is conducted by Noah Meißner and Felix Hornberger and supervised by Dr. David
                        Elsweiler from the University of Regensburg. The study with estimated 69 participants will take place in the
                        period from 05.03.2024 to 15.03.2024.
                    </p>
                    <p className="my-2">Please note:</p>
                    <div className="text-left">
                        <ul className="mb-2">
                            <li>- Your participation is entirely voluntary and can be discontinued or withdrawn at any time</li>
                            <li>- You have no direct benefit from participating in the study (unless you receive 0.25 VP hours as a student
                                of the University of Regensburg), but you support our work and help to advance research in this area.</li>
                            <li>- For the evaluation, we collect some basic demographic personal information (e.g., age, gender, etc.)</li>
                            <li>- During the course of the session, all inquiries and corresponding responses entered into the system will
                                be meticulously documented, inclusive of timestamp data.</li>
                            <li>- Recordings and personal data are subject to the guidelines of the General Data Protection Regulation
                                (GDPR) and will pseudoanonymized (with a coded number) stored, evaluated, and potentially published
                                so that without information from the researchers no conclusions can be drawn about individual persons</li>
                        </ul>
                        <p className="font-normal">The alternative to participation in this study is to choose not to participate. If you have any questions,
                            concerns, or complaints about the informed consent process of this research study or your rights as a
                            human research subject, please contact Dr. David Elsweiler. Please read the following information
                            carefully and take the time you need.</p>
                        <h2 className="text-center my-2">1. Purpose and Goal of this Research</h2>
                        <p className="font-normal">The purpose of this research is to investigate how Generative Information Retrieval systems and their
                            source materials influence users&apos; attitudes and interaction patterns regarding contentious topics. The
                            goal of this study is to analyze how the Generative Information Retrieval systems and answers
                            provided by GIR System (and the way these are generated) affect users&apos; perspectives and engagement
                            behaviors on controversial subjects. Your participation will help us achieve this research goal. The
                            results of this research may be presented at scientific or professional meetings or published in
                            scientific proceedings and journals.</p>
                        <h2 className="text-center my-2">2. Study Participation</h2>
                        <p className="font-normal">Your participation in this online study is entirely voluntary and can be discontinued or withdrawn at any
                            time. You can refuse to answer any questions or continue with the study at any time if you feel
                            uncomfortable in any way. You can discontinue or withdraw your participation at any time without giving
                            a reason. However, we reserve the right to exclude you from the study (e.g. in the case of invalid
                            attempts or if continuing the study could have a negative impact on your well-being or the equipment).
                            You will receive the offered compensation even if you discontinue the study. Repeated participation in
                            the study is not permitted.</p>
                        <h2 className="text-center my-2">3. Study Procedure</h2>
                        <p className="font-normal my-2">After confirming this informed consent, the procedure is as follows:</p>
                        <ul className="mb-2">
                            <li>1. You will be initially provided with a brief introduction to the study. After this, you will complete the informed
                                consent process.</li>
                            <li>2. You will be surveyed to evaluate your pre-existing attitudes on several topics. This step is crucial to
                                ascertain your baseline familiarity with the topic. The system will specifically focus on topics where your
                                stances fall within the range of -1 to 1.</li>
                            <li>3. You will be then introduced to the generative Information Retrieval (IR) System. You will engage in a
                                dialogue with a Large Language Model, through which you access and explore information pertaining to
                                the topic identified in step (2). Your conversation with the chatbot will be forwarded to third-party
                                providers. Therefore, do not disclose any personal data in the chat and do not share any information
                                that you would not discuss with other people. Only chat data will be shared with third party providers.
                                Other data, such as demographics data, will not be shared outside the research team</li>
                            <li>4. When you have completed the task, you will be presented a short post-task questionnaire to ascertain if
                                your perspective has changed and to gather further pertinent feedback and insights derived from your
                                utilization of the system.</li>
                        </ul>
                        <p className="font-normal my-2">The confirmation of participation in this study can be obtained directly from the researchers.</p>
                        <h2 className="text-center my-2">4. Risks and Benefits</h2>
                        <p className="font-normal">In the online study, you will not be exposed to any immediate risk or danger. As with all computer systems on
                            which data is processed, despite security measures, there is a small risk of data leakage and the loss of
                            confidential or personal information. You have no direct benefit from participating in the study (unless you
                            receive 0.25 VP hours as a student of the University of Regensburg), but you support our work and help us to
                            advance research in this area.</p>
                        <h2 className="text-center my-2">5. Data Protection and Confidentiality</h2>
                        <p className="font-normal">In this study, personal and personally identifiable information is collected for our research. The use of personal or
                            personally identifiable data is subject to the General Data Protection Regulation (GDPR) of the European Union
                            (EU) and will be handled in accordance with the GDPR. This means that you can view, correct, restrict the
                            processing of and have deleted the data collected in this study. Your entries will only be registered in the study
                            with your consent. We plan to publish the results of this and other research studies in scientific articles or other
                            media. Your data will be kept until you contact the researchers to have your data destroyed or deleted. Access to
                            the raw data of the study will be encrypted, password protected during the analysis and only for the authors,
                            colleagues and researchers collaborating on this research. As part of the research work, the data is anonymised
                            using coded identification numbers and then made available to the public, whereby no conclusions can be drawn
                            about individual persons without the researchers&apos; information. Once the material is publicly available, the
                            dissemination of the data can no longer be revoked. As no contact details (e.g. emails) are collected, the
                            researchers cannot inform the participants about further details of the study or about a possible breach of
                            confidential data.</p>
                        <h2 className="text-center my-2">6. Identification of Investigators</h2>
                        <p className="font-normal mb-2">If you have any questions or concerns about the research, please feel free to contact:</p>
                        <p className="font-normal">Researchers:</p>
                        <ul className="mb-2">
                            <li>Felix Hornberger (felix.hornberger@stud.uni-regensburg.de)</li>
                            <li>Noah Meißner (noah.meissner@stud.uni-regensburg.de)</li>
                        </ul>
                        <p className="font-normal">Principal investigator:</p>
                        <ul className="mb-2">
                            <li>Dr. David Elsweiler (david.elsweiler@ur.de)</li>
                            <li>University of Regensburg Universitätsstr. 31 93053 Regensburg, Germany</li>
                        </ul>
                    </div>
                </div>
            </div>
            <InformedConsentCheckbox />
            {accept_ic &&
                <div ref={buttonRef}>
                    <NextPageButton timeVar={'informationConsent'} buttonText={'Next Page'} />
                </div>
            }
        </>
    );
}