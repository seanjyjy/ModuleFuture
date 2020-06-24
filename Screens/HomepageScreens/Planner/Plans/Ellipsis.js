import React, { useState } from "react";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { Icon } from "react-native-eva-icons";

const Ellipsis = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const MenuIcon = () => (
    <Icon
      fill="#232323"
      width={20}
      height={20}
      name="more-vertical-outline"
      onPress={toggleMenu}
    />
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <OverflowMenu
      visible={menuVisible}
      anchor={MenuIcon}
      onBackdropPress={toggleMenu}
    >
      <MenuItem
        title={"Delete"}
        onPress={() => {
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
      <MenuItem
        title={"Accept conflict"}
        onPress={() => {
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
    </OverflowMenu>
  );
};
export default Ellipsis;
