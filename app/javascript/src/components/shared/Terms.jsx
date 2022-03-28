import React from "react";
import { useSelector } from "react-redux";

const Terms = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className={isMobile ? "game-box mobile-table-padding" : "game-box"}>
        <div className="card">
          <div className="card-header">
            <h3>Terms and Conditions</h3>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  T & Cs{" "}
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <ul>
                  <li>
                    <div className="heads">
                      <h6>INTRODUCTION</h6>
                      <p className="paragraph">
                        These Terms and Conditions shall be valid for all
                        betting account activity conducted with BetSports, a
                        company duly incorporated and licensed under the laws of
                        Uganda(License Number GB-69-056 ), hereafter referred to
                        as the "Company".
                      </p>
                      <p className="paragraph">
                        Please read these Terms carefully before opening an
                        account with the Company. If you have any questions,
                        contact us for clarification.
                      </p>

                      <h6>Terminology</h6>
                      <span className="paragraph">
                        <ul className="lists">
                          <li>• He means both genders.</li>
                          <li>• Company, we and our means the Company.</li>
                          <li>
                            • Client, User, you or your means a person with a
                            Company betting account.
                          </li>
                          <li>• Website or site means the Company.ug.</li>
                          <li>• Terms means these Terms & Conditions.</li>
                        </ul>
                      </span>
                      <h6>Amendments to the Terms</h6>
                      <p className="paragraph">
                        The Terms can be changed at any time by the Company at
                        its own discretion. All changes will become effective
                        upon their publication on the site. In case of
                        substantial amendment to the Terms, the Company will
                        give notice to Clients prior to such amendment taking
                        effect. For minor or insubstantial amendments to the
                        Terms the Company may not send notification.
                      </p>
                      <h6>Applicable Law</h6>
                      <p className="paragraph">
                        All betting contracts, as well as any other legal
                        relationship between the Client and the Company, for
                        every circumstance not regulated by these Terms, is
                        subject to Ugandan law.
                      </p>
                      <p className="paragraph">
                        The Courts of Uganda are agreed as the ultimate place of
                        jurisdiction in the event of any dispute arising between
                        the Client and the Company.
                      </p>
                      <h6>Bet Acceptance & Processing</h6>
                      <p className="paragraph">
                        Each Client must verify that bet details and the amount
                        staked are correct before confirming a bet. Once
                        confirmed, a bet cannot be changed or cancelled by the
                        Client.
                      </p>
                      <p className="paragraph">
                        A bet sent to the Company does not become a valid bet
                        until a numbered betslip has been issued by the Company.
                        The Company has the right to refuse, accept or partially
                        accept any bet offer that is sent.
                      </p>
                      <h6>Disputes</h6>
                      <p className="paragraph">
                        Any dispute should immediately be reported to the
                        company by email or telephone and the company shall use
                        its best efforts to resolve any dispute with Clients.
                      </p>
                      <p className="paragraph">
                        In the event of any dispute the Client and the company
                        agree that the records on the Company server logs shall
                        act as the final arbiter in determining the outcome of
                        any claim.
                      </p>
                      <p className="paragraph">
                        Clients dissatisfied with their treatment by the company
                        have the option of making a complaint to the Company’s
                        licensor, the National Gaming Board of Uganda.
                      </p>
                      <h6>Errors</h6>
                      <p className="paragraph">
                        Circumstances may arise where a bet is confirmed, or a
                        payment is processed, in error.
                      </p>
                      <p className="paragraph">
                        The following is a non-exhaustive list of such
                        circumstances:
                      </p>
                      <span className="paragraph">
                        <ul className="lists">
                          <li>
                            • When the prices offered by the Company are
                            significantly dissimilar from those available in the
                            general market;
                          </li>
                          <li>
                            • Where a bet containing dependent events is
                            accidentally accepted, because of human or technical
                            error;
                          </li>
                          <li>
                            • When a settling (resulting) error is made while
                            computing or crediting the amount of winnings to a
                            Client account;
                          </li>
                          <li>
                            • When a deposit or withdrawal is incorrectly
                            recorded.
                          </li>
                        </ul>
                      </span>
                      <p className="paragraph">
                        In all such cases the Company reserves the right to
                        correct all financial transactions, cancel accepted bets
                        relating to the error or re-settling bets at the correct
                        price that should have been available at the time the
                        bet was placed.
                      </p>
                      <h6>Intellectual Property</h6>
                      <p className="paragraph">
                        Trademarks, domains, logos, images and any other
                        material used by or in the Company’s services that can
                        be found within its website are protected by copyright
                        and may not be modified, reproduced or redistributed
                        without the Company’s prior written permission.
                      </p>
                      <p className="paragraph">
                        You acknowledge and agree that the material and content
                        contained within the websites is made available for your
                        personal non-commercial use only. Any other use of such
                        content is strictly prohibited. You agree not to assist
                        or facilitate any third party to copy, reproduce,
                        transmit, publish, display, distribute, commercially
                        exploit, tamper with or create derivative works of such
                        material and content.
                      </p>
                      <h6>Legality of Site Use</h6>
                      <p className="paragraph">
                        Use of the site may be illegal in certain countries
                        including, for example, the USA.
                      </p>
                      <p className="paragraph">
                        Every Client is responsible for determining whether use
                        of the site is compliant with applicable laws in the
                        jurisdiction in which he is located at the time of
                        usage.
                      </p>
                      <p className="paragraph">
                        The Company site does not constitute an offer,
                        solicitation or invitation by the Company for the use of
                        betting or other services in any countries where such
                        activity is or may be illegal.
                      </p>
                      <h6>Liabilities & Warranties</h6>
                      <p className="paragraph">
                        The Company does not warrant the constant availability
                        and functionality of services and may not be held liable
                        by the Client for any damages, losses, costs, loss of
                        profits or any other disadvantage a Client may incur in
                        connection with any disconnection from or the
                        non-availability of any of the services offered by the
                        Company.
                      </p>
                      <p className="paragraph">
                        The Company cannot be held liable in any case for any
                        damage or loss caused directly or indirectly by the
                        website, its contents or content provided by a third
                        party. The Company is not liable for any failures caused
                        by the electronic equipment used by the Client while
                        accessing the website or for faults due to the internet
                        service provider used by the Client while accessing the
                        website.
                      </p>
                      <p className="paragraph">
                        The Company assumes no liability for correctness,
                        completeness or up-to-dateness of the information
                        services provided on its website.
                      </p>
                      <h6>Opening and Managing your Betting Account</h6>
                      <p className="paragraph">
                        Each Client who wants to have access to the services
                        offered by the Company must firstly open a betting
                        Account. By opening an account and by placing a bet, the
                        user warrants that he has reached the minimum legal age
                        for participation. In addition, by opening a Company
                        betting account and by placing a bet, the user confirms
                        that he or she retains the legal capacity to enter into
                        an agreement with the Company. If one of these
                        conditions is not respected the user's account will be
                        closed.
                      </p>
                      <p className="paragraph">
                        All payouts via bank transfers can only be made to the
                        person, who owns the BetSports account that requested
                        the bank transfer. So the name and the phone number in
                        BetSports account must match with the bank account
                        holder details, where the transfer was requested.
                      </p>
                      <p className="paragraph">
                        It is prohibited for Clients to buy, sell or transfer
                        betting accounts to other Clients.
                      </p>
                      <p className="paragraph">
                        When a new account is opened the Client is responsible
                        for the accuracy of the information provided. The
                        Company reserves the right to close the account when the
                        information provided is deemed to be false or
                        inaccurate.
                      </p>
                      <p className="paragraph">
                        Every betting account is linked with an individual SIM
                        card (phone number) and all account transactions are
                        unique to that SIM. Funds cannot be transferred from one
                        account / SIM to another.
                      </p>
                      <p className="paragraph">
                        The Company retains the right to close the betting
                        account(s) of any Client who has opened multiple betting
                        accounts under his name, or under different names, if it
                        has reasonable grounds to believe that those multiple
                        betting accounts (even if under different names) have
                        been opened with the intention of deceiving the company
                        by masking the totality of the betting activity of any
                        individual or syndicate or to defeat company bet limits.
                        The Company also reserves the right to cancel any
                        transactions related to such deceit.
                      </p>
                      <p className="paragraph">
                        After opening an account, the Client must keep his
                        account access details secret as all transactions where
                        access details been entered correctly will be regarded
                        as valid. The Company shall not be liable for any claims
                        in the event that the Client gives away, tells, shares,
                        fails to protect or loses his access details.
                      </p>
                      <p className="paragraph">
                        The Client is entitled to apply for the closure or
                        suspension of his Account whenever he/she wishes by
                        making a request to Customer Services by email or
                        telephone. The closure of the Account will correspond to
                        the termination of the Terms. In case the reason behind
                        the closure of the Account is related to concerns about
                        gambling addiction the Client shall indicate it.
                      </p>
                      <p className="paragraph">
                        In accordance with the company’s legal obligations all
                        personal details saved in our system will only be
                        deleted at a Client's express request after the
                        expiration of seven (7) years.
                      </p>
                      <h6>Privacy</h6>
                      <p className="paragraph">
                        In accordance with Lotteries And Gaming Regulations S. I
                        No 7 (2017) of the National Gaming Board of Uganda, we
                        are required to collect the following personal
                        information from users:
                      </p>
                      <span className="paragraph">
                        <ul className="lists">
                          <li>• Name</li>
                          <li>• National Identification Number</li>
                          <li>• Registered Phone Number</li>
                          <li>• Nationality</li>
                          <li>
                            • Passport number for foreigners and refugee cards
                            for refugees
                          </li>
                        </ul>
                      </span>
                      <p className="paragraph">
                        We will take all reasonable steps to ensure that your
                        information is kept secure and protected. All personal
                        data is stored in the database of the company and will
                        not be passed on to third parties except as required by
                        Ugandan law.
                      </p>
                      <p className="paragraph">
                        The Company reserves the right to relay suspected
                        offenders’ details to sporting bodies or authorities
                        which deal with the investigation of offences concerning
                        match-fixing or price manipulation.
                      </p>
                      <p className="paragraph">
                        Collection and Usage of Information The information and
                        data about you which we may collect, use and process
                        includes the following:
                      </p>
                      <span className="paragraph">
                        <ul className="lists">
                          <li>
                            • Information that you provide to us by filling in
                            forms on the Website or any other information you
                            submit to us via the Website or email
                          </li>
                          <li>
                            • Records of correspondence, whether via the
                            Website, email, telephone or other means
                          </li>
                          <li>
                            • Your responses to surveys or customer research
                            that we carry out
                          </li>
                          <li>
                            • details of the transactions you carry out with us
                            and details of your visits to the Website including,
                            but not limited to, traffic data, location data,
                            weblogs and other communication data.
                          </li>
                        </ul>
                      </span>
                      <p className="paragraph">
                        We may use your personal information and data together
                        with other information for the purposes of:
                      </p>
                      <span className="paragraph">
                        <ul className="lists">
                          <li>• Processing your bets and payments</li>
                          <li>
                            • Setting up, operating and managing your account
                          </li>
                          <li>
                            • Complying with our legal and regulatory duties
                          </li>
                          <li>
                            • Carrying out customer research, surveys and
                            analyses
                          </li>
                          <li>
                            • providing you with information about promotional
                            offers and our products and services, where you have
                            consented
                          </li>
                          <li>
                            • Monitoring transactions for the purposes of
                            preventing fraud, irregular betting, money
                            laundering and cheating.
                          </li>
                        </ul>
                      </span>
                      <h6>Severability</h6>
                      <p className="paragraph">
                        If any provision of the Terms is found by any court or
                        administrative body of competent jurisdiction to be
                        invalid or unenforceable, such invalidity or
                        unenforceability shall not affect the other provisions
                        of the Terms which shall remain in full force and
                        effect. In such instances, the part declared invalid or
                        unenforceable shall be amended in a manner consistent
                        with the applicable law to reflect, as closely as
                        possible, the Company’s original intent.
                      </p>
                      <h6>Termination</h6>
                      <p className="paragraph">
                        The Company may terminate your account (including your
                        username and password) if we believe that you have
                        breached any of these Terms or any other applicable
                        rules or have acted in a manner inconsistent with the
                        spirit of any of them.
                      </p>
                      <p className="paragraph">
                        You acknowledge that the Company does not have to give
                        you prior notice of any such termination. An account
                        temporarily suspended at your request may be reopened
                        and will be subject to the Terms in force at the date of
                        the re-opening. The Company retains the right to exclude
                        Clients from its services. In this case it will refund
                        the residual credit balance in the account. If the
                        Account has been closed due to an infringement pursuant
                        to the Terms or to a prohibited behaviour leading to
                        collusion, fraud or whatsoever criminal activity, the
                        residual credit balance may be forfeited. The same
                        procedure will be applied to open bets that result in
                        winnings.
                      </p>
                      <p className="paragraph">
                        Dormant Accounts Should your account become dormant
                        (defined as a period of 12 (twelve) months of
                        inactivity) the Company reserves the right to charge a
                        monthly administration fee.
                      </p>
                      <h6>Underage Betting</h6>
                      <p className="paragraph">
                        By registering on the website BetSports.ug and placing a
                        bet, the Client confirms that he has reached the age of
                        25. The Company reserves the right to verify any
                        Client’s age and to exclude Clients from its services if
                        there are doubts regarding the attainment of the minimum
                        age.
                      </p>
                      <p className="paragraph">
                        Any Client using the Company services who is identified
                        as underage shall have all winnings forfeited and his
                        betting account disabled.
                      </p>
                      <h6>
                        Verification of Identity / AML (anti money laundering)
                      </h6>
                      <p className="paragraph">
                        You warrant that the details you supply when opening or
                        updating your account are correct and you are the
                        rightful owner of the money which you at any time
                        deposit in your account.
                      </p>
                      <p className="paragraph">
                        You authorise the Company to undertake verification
                        checks from time to time as the Company itself may
                        require or may be required by third parties (including,
                        but not limited to, regulatory bodies) to confirm these
                        facts.
                      </p>
                      <p className="paragraph">
                        You agree that from time to time, upon our request, you
                        may be required to provide additional details in respect
                        of any of information you have provided the Company,
                        including in relation to any deposits which you have
                        made into your account.
                      </p>
                      <p className="paragraph">
                        In certain circumstances the Company may have to contact
                        you and ask you to provide further personal information
                        such as: a notarised ID, proof of address, utility bill
                        or financial details. Until such information has been
                        supplied to its satisfaction, the Company may prevent
                        any activity in relation to the account.
                      </p>
                      <p className="paragraph">
                        Where the Company reasonably believes that deliberately
                        incorrect information has been provided, the Company may
                        retain any amount deposited.
                      </p>
                      <h6>Win Bouns</h6>
                      <p className="paragraph">
                        Your bonus percentage is determined by the number of
                        matches completed. Therefore, any games in your multibet
                        which are cancelled or postponed won’t count towards
                        your total.
                      </p>
                      <p className="paragraph">
                        Your win bonus is calculated based on your winnings
                        excluding the stake. So if you staked UGX 100 and won
                        UGX 1,000, your winnings without the stake would be UGX
                        900. Therefore, a 50% win bonus would be UGX 450 and
                        your total payout combining initial winnings and win
                        bonus would be UGX 1,450.
                      </p>
                      <h6>Publicity</h6>
                      <p className="paragraph">
                        By playing any of our games on the website (Sports
                        Betting, Jackpot, Casino) you agree that in case of
                        winning a prize, you will allow your name and photo to
                        be used for promotional purposes by the Company.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
