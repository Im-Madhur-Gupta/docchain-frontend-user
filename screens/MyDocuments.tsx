import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Card } from "@rneui/base";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DashboardRoutes } from "../constants/DashboardRoutes";
import { CommonActions } from "@react-navigation/native";
import {
  CustomDocumentResponse,
  DocumentData,
  NADDocumentResponse,
} from "../types/Document";
import useAxios from "../hooks/useAxios";
import { getToken } from "../services/getToken";
import Loading from "../components/Loading";
import Arrow from "../components/Arrow";
import SearchBar from "../components/SearchBar";

interface Props {
  navigation: BottomTabNavigationProp<
    DashboardRoutes,
    "My Documents",
    undefined
  >;
}

interface Response {
  Custom_Document: CustomDocumentResponse[];
  NAD_Document: NADDocumentResponse[];
  user: number;
}

const MyDocuments: React.FC<Props> = ({ navigation }) => {
  const [searchResult, setSearchResult] = React.useState<DocumentData[]>([]);
  const [data, setData] = React.useState<DocumentData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const getDocs = async () => {
      const newData = [
        {
          ID: 1,
          title: "Document 1",
          pageCount: 10,
          custom: true,
          isVerified: true,
          user: 1,
          createdAt: new Date(),
          uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
          ID: 2,
          title: "Document 2",
          pageCount: 2,
          custom: true,
          isVerified: true,
          user: 1,
          createdAt: new Date(),
          uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
      ];
      setData(newData);
      setSearchResult(newData);
    };
    getDocs();
    setLoading(false);
  }, []);

  const handlePress = (item: DocumentData) => {
    console.log("handlePress", item);
    navigation.dispatch(
      CommonActions.navigate({
        name: "Single Document",
        params: {
          document: item,
        },
      })
    );
  };

  const handleSearch = (text: string) => {
    const newData = data
      .filter((item) => item.title.toLowerCase().includes(text.toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title))
      .sort((a, b) => a.pageCount - b.pageCount);
    setSearchResult(newData);
  };

  return (
    <View style={styles.container}>
      <SearchBar handleSearch={handleSearch} />
      <View style={styles.subContainer}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={searchResult}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => handlePress(item)}>
                <View style={styles.cardContainer}>
                  <View style={styles.previewContainer}>
                    <Text style={styles.previewTitle}>{item.title}</Text>
                    <Text style={styles.previewText}>
                      {new String(
                        "Dave is a god and he is too pro. Why you ask? Just because!"
                      ).repeat(Math.floor(Math.random() * 10) + 1)}
                    </Text>
                  </View>
                  <View>
                    <Card.Title style={styles.leftAlign}>
                      <Text numberOfLines={1}>{item.title}</Text>
                    </Card.Title>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#888",
                      }}
                    >
                      {item.pageCount === 1
                        ? `1 Page`
                        : `${item.pageCount} Pages`}
                    </Text>
                  </View>
                  <Arrow />
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default MyDocuments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 5,
  },
  subContainer: { flex: 1, marginTop: 20 },
  cardContainer: {
    backgroundColor: "#EEEEEE",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    elevation: 5,
  },
  previewContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    opacity: 0.5,
    overflow: "hidden",
  },
  previewTitle: {
    fontSize: 5,
    marginLeft: 5,
    marginTop: 5,
  },
  previewText: {
    fontSize: 2,
    marginHorizontal: 5,
    opacity: 0.4,
  },
  leftAlign: {
    textAlign: "left",
  },
});
