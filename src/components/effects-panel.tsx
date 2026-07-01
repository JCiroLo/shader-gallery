import React, { useState } from "react";
import { useShallow } from "zustand/shallow";
import { AnimatePresence, motion } from "framer-motion";
import EffectProperties from "@/components/effect-properties";
import EffectPropertiesTabs from "@/components/effect-properties-tabs";
import EffectsList from "@/components/effects-list";
import EffectsQueue from "@/components/effects-queue";
import useMediaQuery from "@/hooks/use-media-query";
import useSettingsStore from "@/stores/settings-store";
import clazz from "@/lib/clazz";
import type { Tab } from "@/types";

type TabContentProps = {
  direction: number;
  children: React.ReactNode;
};

const c = clazz("effects-panel");

const TabContent: React.FC<TabContentProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
};

const EffectsPanel = () => {
  const { tab, optionsVisible, setTab } = useSettingsStore(
    useShallow((state) => ({
      tab: state.tab,
      optionsVisible: state.optionsVisible,
      setTab: state.setTab,
    })),
  );

  const isMobile = useMediaQuery("(max-width : 576px)");

  const [direction, setDirection] = useState(1);

  const CurrentTab = {
    effects: EffectsList,
    layers: EffectsQueue,
    properties: isMobile ? EffectPropertiesTabs : EffectProperties,
  }[tab];

  const handleChangeTab = (nextTab: Tab) => {
    setTab(nextTab);
    setDirection(nextTab === "effects" ? 1 : -1);
  };

  return (
    <div className={c({ hide: !optionsVisible })}>
      <AnimatePresence initial={false}>
        {isMobile ? (
          tab !== "properties" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ overflow: "hidden", flexShrink: 0 }}
            >
              <div className={c("tabs")}>
                <button className={c("tab", { active: tab === "effects" })} onClick={() => handleChangeTab("effects")}>
                  Effects
                </button>
                <button className={c("tab", { active: tab === "layers" })} onClick={() => handleChangeTab("layers")}>
                  Layers
                </button>
              </div>
              <hr />
            </motion.div>
          )
        ) : (
          <>
            <div className={c("tabs")}>
              <button className={c("tab", { active: tab === "effects" })} onClick={() => handleChangeTab("effects")}>
                Effects
              </button>
              <button className={c("tab", { active: tab === "layers" })} onClick={() => handleChangeTab("layers")}>
                Layers
              </button>
            </div>
            <hr />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" custom={direction}>
        <TabContent key={tab} direction={direction}>
          <CurrentTab />
        </TabContent>
      </AnimatePresence>
    </div>
  );
};

export default EffectsPanel;
