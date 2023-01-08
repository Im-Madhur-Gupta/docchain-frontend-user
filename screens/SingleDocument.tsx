import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import ArcBackground from "../components/ArcBackground";
import WebView from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "@rneui/themed/dist/Image";

const doc_url =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // todo: make this dynamice
const uri = `https://docs.google.com/gview?embedded=true&url=${doc_url}`;

const SingleDocument = ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, "Single Document">) => {
  const { document } = route.params;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const verifiedBy = [
    {
      id: "1",
      name: "Apple Inc.",
      verifiedAt: "2020-12-12 12:12:12",
    },
    {
      id: "2",
      name: "Google Inc.",
      verifiedAt: "2020-12-10 11:12:12",
    },
    {
      id: "3",
      name: "Ministry of Health, India",
      verifiedAt: "2020-12-09 10:12:12",
    },
  ];

  console.log(document);
  return (
    <ArcBackground>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{document.title}</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.detailButton}
        >
          <Ionicons name="ios-information-circle" size={30} color="white" />
          <Text style={styles.infoText}>Details</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewContainer}>
        <WebView
          source={{ uri }}
          containerStyle={styles.container}
          style={styles.webview}
          options={{ animationEnabled: false }}
          scrollEnabled={true}
          androidLayerType="software"
          overScrollMode="never"
        />
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: Dimensions.get("window").width / 2,
          height: Dimensions.get("window").height / 2,
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons
              name="close"
              size={30}
              color="black"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Document Details</Text>
            <Text style={styles.subtitle}>Title:</Text>
            <Text>{document.title}</Text>
            <Text style={styles.subtitle}>Created At:</Text>
            <Text style={styles.verifierDate}>
              {document.createdAt?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <Text style={styles.subtitle}>Page Count:</Text>
            <Text>{document.pageCount}</Text>

            <Text style={styles.subtitle}>Verified By:</Text>
            <FlatList
              data={verifiedBy}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.verifierContainer}>
                  <Image
                    style={styles.verifierImage}
                    source={{
                      uri: "https://picsum.photos/200/200",
                    }}
                  />
                  <View>
                    <Text style={styles.verifierTitle}>{item.name}</Text>
                    <Text style={styles.verifierDate}>{item.verifiedAt}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </ArcBackground>
  );
};

export default SingleDocument;

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,
  },
  viewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    marginVertical: 80,
  },
  webview: {
    width: Dimensions.get("window").width - 50,
    borderRadius: 20,
    flex: 1,
    resizeMode: "cover",
  },
  closeIcon: {
    marginLeft: 20,
    marginTop: 20,
  },
  infoText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  detailContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  detailTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  verifierContainer: {
    flex: 1,
    marginVertical: 10,
    flexDirection: "row",
  },
  verifierTitle: {
    fontSize: 16,
  },
  verifierDate: {
    fontSize: 12,
    opacity: 0.4,
  },
  verifierImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
});
