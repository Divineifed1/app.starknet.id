import React, { FunctionComponent, useState } from "react";
import styles from "../../styles/components/profilePic.module.css";
import ModalProfilePic from "../UI/modalProfilePic";
import SelectedCollections from "./selectedCollections";
import PfpGallery from "./pfpGallery";
import useWhitelistedNFTs from "@/hooks/useWhitelistedNFTs";
import { useAccount } from "@starknet-react/core";

type UpdateProfilePicProps = {
  tokenId: string;
  back: () => void;
  openTxModal: () => void;
  setPfpTxHash: (hash: string) => void;
};

const UpdateProfilePic: FunctionComponent<UpdateProfilePicProps> = ({
  tokenId,
  back,
  openTxModal,
  setPfpTxHash,
}) => {
  const { address } = useAccount();
  const { userNfts, isLoading } = useWhitelistedNFTs(address || "");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPfp, setSelectedPfp] = useState<StarkscanNftProps | null>(
    null
  );

  const handlePfpSelection = (nft: StarkscanNftProps) => {
    setSelectedPfp(nft);
    setModalOpen(true);
  };

  const handleModalClose = (cancel: boolean) => {
    setModalOpen(false);
    if (!cancel) {
      openTxModal();
      back();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={userNfts.length === 0 ? styles.noNfts : styles.gallery}>
          <PfpGallery
            selectPfp={handlePfpSelection}
            selectedPfp={selectedPfp}
            userNfts={userNfts}
            isLoading={isLoading}
            title="Our Suggestions"
          />
        </div>

        {userNfts.length > 0 && (
          <div className={styles.gallery}>
            <SelectedCollections />
          </div>
        )}
      </div>

      <ModalProfilePic
        isModalOpen={modalOpen}
        closeModal={handleModalClose}
        nftData={selectedPfp as StarkscanNftProps}
        tokenId={tokenId}
        setPfpTxHash={setPfpTxHash}
      />
    </>
  );
};

export default UpdateProfilePic;