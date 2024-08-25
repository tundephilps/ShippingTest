import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Checkbox } from "expo-checkbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import AccordionCard from "@/components/AccordionCard";

import useShipment from "@/hooks/useShipment"; 

const Shipment = () => {
  const [isChecked, setChecked] = useState<boolean>(false);

  const refRBSheet = useRef<RBSheet>(null);

  const { isLoading, shipments, selectedStatus, isMarkedAll, handleMarkAll, handleInput, handleFilter } = useShipment();

  const statusOptions = [
    "New ShipmentTT",
    "Received",
    "Putaway",
    "Delivered",
    "Canceled",
    "Rejected",
    "Lost",
    "On Hold",
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 99,
              alignSelf: "center",
            }}
            source={require("../../assets/images/Face.png")}
            resizeMode="contain"
          />
        </View>
        <View>
          <Image
            style={{
              height: 16,
              width: 92,
              alignSelf: "center",
            }}
            source={require("../../assets/images/Logo2.png")}
            resizeMode="contain"
          />
        </View>
        <View>
          <Image
            style={{
              height: 40,
              width: 40,
              alignSelf: "center",
            }}
            source={require("../../assets/images/bell.png")}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={{ paddingTop: 12, gap: 6, paddingBottom: 12 }}>
        <Text style={{ color: "#000000" }}>Hello,</Text>
        <Text style={{ fontSize: 28, fontWeight: "500" }}>Ibrahim Shakes</Text>
      </View>
      <View
        style={{
          backgroundColor: "#F4F2F8",
          flexDirection: "row",
          alignItems: "center",
          height: 44,
          paddingHorizontal: 12,
          borderRadius: 10,
        }}
      >
        <FontAwesome name="search" size={24} color="#A7A3B3" />
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            padding: 10,
            fontSize: 16,
            color: "",
          }}
          onChangeText={ handleInput }
        />
      </View>
      {/* Filter */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => refRBSheet.current?.open()}
          style={{
            backgroundColor: "#F4F2F8",
            height: 44,
            borderRadius: 5,
            width: "45%",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="filter-outline" size={24} color="#58536E" />
            <Text
              style={{
                color: "#58536E",
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Filters
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#007AFF", // blue color
            height: 44,
            borderRadius: 5,
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons name="line-scan" size={24} color="#fff" />
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Add Scan
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* BottomSheet */}
      <RBSheet
        ref={refRBSheet}
        height={350}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={styles.sheetHeader}>
          <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>Filters</Text>
          <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ color: "#58536e", paddingHorizontal: 16 }}>
          SHIPMENT STATUS
        </Text>
        <View style={styles.buttonsContainer}>
          {statusOptions.map((status, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.statusButton,
                selectedStatus.includes(status) && styles.selectedButton,
              ]}
              onPress={() => handleFilter(status)}
            >
              <Text style={styles.buttonText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>

      {/* Shipments */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingTop: 22,
          }}
        >
          <Text style={{ color: "black", fontSize: 22, fontWeight: "600" }}>
            Shipments
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Checkbox
              value={ isMarkedAll }
              onValueChange={ handleMarkAll }
              color={isChecked ? "#4630EB" : undefined} // Optional: customize the color when checked
            />

            <Text style={{ fontSize: 18, color: "#2f50c1" }}>Mark All</Text>
          </View>
        </View>
        {/* Cards */}
        <View style={{ paddingTop: 12, gap: 8 }}>
          {isLoading && <ActivityIndicator color="#000"/>}
          {shipments.map((item : any, key : number) => (
            <AccordionCard item={ item } index={ key }/>
          ))}
          {shipments.length === 0 && !isLoading && <Text>No shipment found</Text>}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },

  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#Eae7f2",
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  cancelButton: {
    color: "#2f50c1",
    fontSize: 16,
  },
  doneButton: {
    color: "#2f50c1",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  statusButton: {
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: "#f4f2f8",
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  buttonText: {
    color: "#000",
  },
});

export default Shipment;
