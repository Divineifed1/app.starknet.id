import React, { useMemo } from "react";
import AvailableIdentities from "@/components/identities/availableIdentities";
import homeStyles from "../../styles/Home.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";

const TokenIdPage: NextPage = () => {
  const router = useRouter();
  const tokenId = useMemo(() => router.query.tokenId ?? "", [router.query.tokenId]);

  return (
    <div className={homeStyles.wrapperScreen}>
      <div className="mt-[12vh]">
        {tokenId && <AvailableIdentities tokenId={tokenId as string} />}
      </div>
    </div>
  );
};

export default TokenIdPage;

