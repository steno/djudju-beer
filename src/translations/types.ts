export interface Translation {
  navigation: {
    language: string;
    home: string;
    about: string;
    privacy: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  beers: {
    ingredients: {
      title: string;
    };
    orderNow: string;
    banana: {
      description: string;
    };
    mango: {
      description: string;
    };
    pineapple: {
      description: string;
    };
    palm: {
      description: string;
    };
    passionFruit: {
      description: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    mission: {
      title: string;
      description: string;
      features: {
        innovation: {
          title: string;
          description: string;
        };
        quality: {
          title: string;
          description: string;
        };
        sustainability: {
          title: string;
          description: string;
        };
      };
    };
    story: {
      title: string;
      content: string[];
    };
    team: {
      title: string;
      subtitle: string;
      members: {
        ceo: {
          name: string;
          role: string;
          description: string;
        };
        brewer: {
          name: string;
          role: string;
          description: string;
        };
        innovation: {
          name: string;
          role: string;
          description: string;
        };
      };
    };
  };
  contact: {
    title: string;
    subtitle: string;
    info: {
      email: {
        title: string;
        value: string;
      };
      phone: {
        title: string;
        value: string;
      };
      address: {
        title: string;
        lines: string[];
      };
    };
    form: {
      title: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
    };
  };
  privacy: {
    title: string;
    subtitle: string;
    features: {
      protection: {
        title: string;
        description: string;
      };
      storage: {
        title: string;
        description: string;
      };
      rights: {
        title: string;
        description: string;
      };
      transparency: {
        title: string;
        description: string;
      };
    };
    content: {
      introduction: {
        title: string;
        text: string;
      };
      collection: {
        title: string;
        items: string[];
      };
      usage: {
        title: string;
        items: string[];
      };
      rights: {
        title: string;
        items: string[];
      };
    };
    contact: {
      title: string;
      text: string;
      email: string;
    };
  };
  footer: {
    description: string;
    quickLinks: {
      title: string;
    };
    contact: {
      title: string;
    };
    rights: string;
  };
}